import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

export interface JwtPayload {
  sub: string;
  iss: string;
  aud: string;
  [key: string]: any;
}

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    const domain = configService.get<string>('AUTH0_DOMAIN');
    const audience = configService.get<string>('AUTH0_AUDIENCE');

    if (!domain || !audience) {
      throw new Error('Missing required Auth0 configuration');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${domain}/.well-known/jwks.json`,
      }),
      audience,
      issuer: `https://${domain}/`,
      algorithms: ['RS256'],
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token payload');
    }
    return payload;
  }
}
