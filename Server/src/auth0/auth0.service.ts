import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosError } from 'axios';
import { Auth0UserProfile, CachedUser } from './types';

@Injectable()
export class Auth0Service {
  private readonly userCache = new Map<string, CachedUser>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private readonly MAX_RETRIES = 3;
  private readonly INITIAL_RETRY_DELAY = 1000;

  constructor(private readonly configService: ConfigService) {
    // Start cache cleanup interval
    setInterval(() => this.cleanupCache(), this.CACHE_DURATION);
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getUserProfile(token: string): Promise<Auth0UserProfile> {
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    // Check cache first
    const cached = this.userCache.get(token);
    if (cached && cached.expiresAt > Date.now()) {
      console.log('🚀 Using cached Auth0 user data');
      return cached.user;
    }

    let retries = this.MAX_RETRIES;
    let delay = this.INITIAL_RETRY_DELAY;

    while (retries > 0) {
      try {
        const userInfoResponse = await axios.get<Auth0UserProfile>(
          `${this.configService.get<string>('AUTH0_DOMAIN')}/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            timeout: 5000, // 5 second timeout
          },
        );

        const auth0User = userInfoResponse.data;

        // Validate required fields
        if (!auth0User.sub || !auth0User.email) {
          throw new UnauthorizedException('Invalid user profile data');
        }

        // Cache the result
        this.userCache.set(token, {
          user: auth0User,
          expiresAt: Date.now() + this.CACHE_DURATION,
        });

        return auth0User;
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 429 && retries > 1) {
            console.log(
              `⚠️ Rate limited by Auth0, retrying in ${delay}ms... (${
                retries - 1
              } retries left)`,
            );
            await this.sleep(delay);
            delay *= 2; // Exponential backoff
            retries--;
            continue;
          }

          if (error.response?.status === 401) {
            throw new UnauthorizedException('Invalid or expired token');
          }
        }

        console.error('❌ Auth0 API error:', error);
        throw new UnauthorizedException('Failed to fetch user profile');
      }
    }

    throw new UnauthorizedException('Failed to get user profile after retries');
  }

  private cleanupCache(): void {
    const now = Date.now();
    let cleanedCount = 0;
    
    for (const [token, cached] of this.userCache.entries()) {
      if (cached.expiresAt <= now) {
        this.userCache.delete(token);
        cleanedCount++;
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧹 Cleaned up ${cleanedCount} expired cache entries`);
    }
  }
} 