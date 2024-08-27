import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IJWTGetDataDto } from '@/models/headers/model.dto';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.KEYCLOAK_PUBLIC_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload) {
    return payload;
  }

  decodeToken(token: string): IJWTGetDataDto {
    try {
      const decoded = jwt.decode(token, { complete: true });
      if (!decoded) throw new UnauthorizedException(commonExceptions.http.unauthorized);
      return decoded as unknown as any;
    } catch (error) {
      throw new UnauthorizedException(commonExceptions.http.unauthorized);
    }
  }
}
