import * as argon2 from 'argon2';
import { EntityManager } from '@mikro-orm/core';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '@src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@src/user/entities/user.entity';
import { JwtPayload } from './helper';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(user: User) {
    const payload: JwtPayload = { username: user.email, sub: user.id };

    try {
      const tokens = await this.getTokens(payload);
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } catch (err) {
      throw err;
    }
  }

  async logout(user: User) {
    return await this.userService.update(user.id, { refreshToken: null });
  }

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userService.findByEmail(email, ['password']);
      const isValid = await user.verify(password);
      if (!isValid) {
        throw new Error('Could not verify');
      }

      return user;
    } catch (e) {
      throw new UnauthorizedException('Could not login', { cause: e });
    }
  }

  async getTokens(payload: { username: string; sub: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),

      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    try {
      const user = await this.userService.findById(userId);
      const hashedToken = await argon2.hash(refreshToken);
      await this.userService.update(user.id, { refreshToken: hashedToken });
    } catch (err) {
      throw new BadRequestException('Cannot Update', { cause: err });
    }
  }

  async refreshToken(user: User) {
    try {
      if (!user.refreshToken || !user.checkToken) {
        throw new ForbiddenException('Access Denied');
      }

      const refreshToken = user.checkToken;
      const matchTokens = await argon2.verify(user.refreshToken, refreshToken);

      if (!matchTokens) {
        throw new ForbiddenException('Access Denied');
      }

      const tokens = await this.getTokens({
        username: user.email,
        sub: user.id,
      });
      await this.updateRefreshToken(user.id, tokens.refreshToken);
      return tokens;
    } catch (err) {
      throw new ForbiddenException('Access Denied', { cause: err });
    }
  }
}
