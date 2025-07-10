import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

interface CachedUser {
  user: any;
  expiresAt: number;
}

@Injectable()
export class Auth0Service {
  private readonly userCache = new Map<string, CachedUser>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor(private readonly configService: ConfigService) {}

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getUserProfile(token: string): Promise<any> {
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    // Check cache first
    const cached = this.userCache.get(token);
    if (cached && cached.expiresAt > Date.now()) {
      console.log('🚀 Using cached Auth0 user data');
      return cached.user;
    }

    // Get user profile from Auth0 with retry logic
    let retries = 3;
    let delay = 1000; // Start with 1 second
    let auth0User: any;

    while (retries > 0) {
      try {
        const userInfoResponse = await axios.get(
          `${this.configService.get<string>('AUTH0_DOMAIN')}/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        auth0User = userInfoResponse.data;

        // Cache the result
        this.userCache.set(token, {
          user: auth0User,
          expiresAt: Date.now() + this.CACHE_DURATION,
        });

        break; // Success, exit retry loop
      } catch (error: any) {
        if (error.response?.status === 429 && retries > 1) {
          console.log(
            `⚠️ Rate limited by Auth0, retrying in ${delay}ms... (${
              retries - 1
            } retries left)`,
          );
          await this.sleep(delay);
          delay *= 2; // Exponential backoff
          retries--;
        } else {
          throw new UnauthorizedException('Failed to fetch user profile');
        }
      }
    }

    if (!auth0User) {
      throw new UnauthorizedException('Failed to get user profile after retries');
    }

    return auth0User;
  }

  // Clean up expired cache entries
  cleanupCache(): void {
    const now = Date.now();
    for (const [token, cached] of this.userCache.entries()) {
      if (cached.expiresAt <= now) {
        this.userCache.delete(token);
      }
    }
  }
} 