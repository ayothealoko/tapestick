import { wrap } from '@mikro-orm/core';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@src/user/user.service';
import { JwtPayload } from './helper';
import { Request } from 'express';
import { User } from '@src/user/entities/user.entity';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<User> {
    const refreshToken = cookieExtractor(req);
    try {
      if (!refreshToken) {
        throw new UnauthorizedException('Could not authorize');
      }
      const user = await this.userService.findById(payload.sub, [
        'refreshToken',
      ]);
      // note just because token user is found does
      // not mean refresh token is verified
      wrap(user).assign({ checkToken: refreshToken });
      return user;
    } catch (err) {
      throw new UnauthorizedException('Could not authorize', { cause: err });
    }
  }
}

function cookieExtractor(req: Request) {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies['jwt-refresh'];
  }

  return jwt;
}
