import { Injectable, ExecutionContext, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable, firstValueFrom } from 'rxjs';
import { Auth0Service } from './auth0.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { User } from '../user/entities/user.entity';
import { Auth0UserProfile, RequestWithUser } from './types';

@Injectable()
export class Auth0Guard extends AuthGuard('jwt') {
  constructor(
    private readonly auth0Service: Auth0Service,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('🔍 Auth0Guard - Starting authentication');
    
    // First, do the standard JWT authentication
    const activateResult = super.canActivate(context);
    const isAuthenticated = activateResult instanceof Observable
      ? await firstValueFrom(activateResult)
      : await Promise.resolve(activateResult);

    if (!isAuthenticated) {
      return false;
    }

    // Now fetch and merge user profile
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      console.log('🔍 Auth0Guard - Getting Auth0 user profile');
      const auth0User = await this.auth0Service.getUserProfile(token);
      console.log('✅ Auth0Guard - Got Auth0 user:', auth0User.email);
      
      await this.ensureUserExists(auth0User);
      
      const dbUser = await this.getUserFromDatabase(auth0User);
      console.log('✅ Auth0Guard - Got database user:', { email: dbUser.email, role: dbUser.role });
      
      // Merge user data - extract plain data from MongoDB document
      const plainDbUser = dbUser.toObject ? (dbUser.toObject() as User) : dbUser;
      request.user = {
        ...plainDbUser,
        ...auth0User,
      } as User & Auth0UserProfile;

      console.log('✅ Auth0Guard - Final merged user:', { 
        email: request.user.email, 
        role: request.user.role,
        sub: request.user.sub 
      });

      return true;
    } catch (error) {
      console.error('❌ Auth0Guard - User profile error:', error);
      throw new InternalServerErrorException('Failed to process user profile');
    }
  }

  private extractTokenFromHeader(request: RequestWithUser): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return undefined;
    }
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }

  private async ensureUserExists(auth0User: Auth0UserProfile): Promise<void> {
    try {
      let user = await this.userModel.findOne({ auth0Id: auth0User.sub }).exec();

      if (!user) {
        user = await this.userModel.findOne({ email: auth0User.email }).exec();

        if (user && !user.auth0Id) {
          user.auth0Id = auth0User.sub;
          await user.save();
          console.log(`✅ Updated existing user with Auth0 ID: ${auth0User.email}`);
        } else if (!user) {
          user = await this.userModel.create({
            auth0Id: auth0User.sub,
            email: auth0User.email,
            firstName: auth0User.given_name || '',
            lastName: auth0User.family_name || '',
            role: 'user',
          });
          console.log(`✅ Created new user for Auth0 ID: ${auth0User.sub}`);
        }
      }
    } catch (error) {
      console.error('❌ Failed to ensure user exists:', error);
      throw new InternalServerErrorException('Failed to process user data');
    }
  }

  private async getUserFromDatabase(auth0User: Auth0UserProfile): Promise<User & Document> {
    const user = await this.userModel.findOne({ auth0Id: auth0User.sub }).exec();
    if (!user) {
      throw new InternalServerErrorException('User not found after creation');
    }
    return user;
  }
}
