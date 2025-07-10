import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Auth0Service } from './auth0.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/entities/user.entity';

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
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const auth0User = await this.auth0Service.getUserProfile(token);
      const auth0Id = auth0User.sub;

      // Find user by auth0Id first, then by email for existing users
      let mongoUser = await this.userModel.findOne({ auth0Id }).exec();

      if (!mongoUser) {
        // Try to find by email (for existing users)
        mongoUser = await this.userModel
          .findOne({ email: auth0User.email })
          .exec();

        if (mongoUser && !mongoUser.auth0Id) {
          // Update existing user with auth0Id
          mongoUser.auth0Id = auth0Id;
          await mongoUser.save();
          console.log(`✅ Updated existing user with Auth0 ID: ${auth0User.email}`);
        }
      }

      if (!mongoUser) {
        // Create new user if they don't exist
        mongoUser = await this.userModel.create({
          auth0Id,
          email: auth0User.email,
          firstName: auth0User.given_name || '',
          lastName: auth0User.family_name || '',
        });
        console.log(`✅ Created new user for Auth0 ID: ${auth0Id}`);
      }

      // Add user info to request object
      request.user = {
        id: mongoUser._id.toString(),
        auth0Id,
        email: auth0User.email,
        name: auth0User.name,
        firstName: auth0User.given_name || '',
        lastName: auth0User.family_name || '',
        picture: auth0User.picture,
        ...auth0User,
      };

      return next.handle();
    } catch (error) {
      console.error('❌ Failed to fetch user profile:', error);
      throw new UnauthorizedException('Failed to fetch user profile');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
} 