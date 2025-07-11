import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Auth0Service } from './auth0.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/entities/user.entity';
import { Auth0UserProfile, RequestWithUser } from './types';
import { Request } from 'express';

@Injectable()
export class UserProfileInterceptor implements NestInterceptor {
  constructor(
    private readonly auth0Service: Auth0Service,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const auth0User = await this.auth0Service.getUserProfile(token);
      await this.ensureUserExists(auth0User);
      
      // Add user info to request object
      (request as RequestWithUser).user = {
        ...await this.getUserFromDatabase(auth0User),
        ...auth0User,
      };

      return next.handle();
    } catch (error) {
      console.error('❌ User profile interceptor error:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to process user profile');
    }
  }

  private async ensureUserExists(auth0User: Auth0UserProfile): Promise<void> {
    try {
      // Find user by auth0Id first
      let user = await this.userModel.findOne({ auth0Id: auth0User.sub }).exec();

      if (!user) {
        // Try to find by email for existing users
        user = await this.userModel.findOne({ email: auth0User.email }).exec();

        if (user && !user.auth0Id) {
          // Update existing user with auth0Id
          user.auth0Id = auth0User.sub;
          await user.save();
          console.log(`✅ Updated existing user with Auth0 ID: ${auth0User.email}`);
        } else if (!user) {
          // Create new user
          user = await this.userModel.create({
            auth0Id: auth0User.sub,
            email: auth0User.email,
            firstName: auth0User.given_name || '',
            lastName: auth0User.family_name || '',
            role: 'user', // Default role
          });
          console.log(`✅ Created new user for Auth0 ID: ${auth0User.sub}`);
        }
      }
    } catch (error) {
      console.error('❌ Failed to ensure user exists:', error);
      throw new InternalServerErrorException('Failed to process user data');
    }
  }

  private async getUserFromDatabase(auth0User: Auth0UserProfile): Promise<User> {
    const user = await this.userModel.findOne({ auth0Id: auth0User.sub }).exec();
    if (!user) {
      throw new InternalServerErrorException('User not found after creation');
    }
    return user;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return undefined;
    }
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
} 