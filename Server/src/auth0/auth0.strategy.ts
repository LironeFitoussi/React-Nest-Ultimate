import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

export interface JwtPayload {
  sub: string;
  iss: string;
  aud: string[] | string;
  [key: string]: any;
}

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'jwt') {
  private configuredAudience: string;
  private configuredDomain: string;

  constructor(private configService: ConfigService) {
    let domain = configService.get<string>('AUTH0_DOMAIN');
    domain = domain?.replace(/^https?:\/\//, '');
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

    this.configuredAudience = audience;
    this.configuredDomain = domain;
  }

  validate(payload: JwtPayload): JwtPayload {
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token: missing subject');
    }

    const expectedIssuer = `https://${this.configuredDomain}/`;
    if (payload.iss !== expectedIssuer) {
      throw new UnauthorizedException('Invalid token: issuer mismatch');
    }

    const hasValidAudience = Array.isArray(payload.aud)
      ? payload.aud.includes(this.configuredAudience)
      : payload.aud === this.configuredAudience;

    if (!hasValidAudience) {
      throw new UnauthorizedException('Invalid token: audience mismatch');
    }

    return payload;
  }
}
