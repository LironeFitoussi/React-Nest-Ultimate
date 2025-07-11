import { User } from '../user/entities/user.entity';
import { Request } from 'express';

export interface Auth0UserProfile {
  sub: string;
  email: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
  updated_at?: string;
}

export interface RequestWithUser extends Request {
  user: User & Auth0UserProfile;
}

export interface JwtPayload {
  sub: string;
  iss: string;
  aud: string[] | string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export interface CachedUser {
  user: Auth0UserProfile;
  expiresAt: number;
} 