import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { Auth0Strategy } from './auth0.strategy';
import { Auth0Guard } from './auth0.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
  ],
  providers: [Auth0Strategy, Auth0Guard],
  exports: [Auth0Guard],
})
export class Auth0Module {} 