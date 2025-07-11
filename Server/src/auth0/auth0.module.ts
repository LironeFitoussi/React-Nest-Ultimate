import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth0Strategy } from './auth0.strategy';
import { Auth0Guard } from './auth0.guard';
import { Auth0Service } from './auth0.service';
import { UserProfileInterceptor } from './user-profile.interceptor';
import { User, UserSchema } from '../user/entities/user.entity';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [Auth0Strategy, Auth0Guard, Auth0Service, UserProfileInterceptor],
  exports: [Auth0Guard, Auth0Service, UserProfileInterceptor],
})
export class Auth0Module {} 