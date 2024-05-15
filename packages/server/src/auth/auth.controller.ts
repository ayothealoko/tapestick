import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { UserService } from '@src/user/user.service';
import { CookieOptions, Request, Response } from 'express';
import { LocalAuthGuard } from '@src/auth/local-auth.guards';
import { AccessTokenGuard } from '@src/auth/accessToken.guards';
import { RefreshTokenGuard } from '@src/auth/refreshToken.guards';
import { AuthService } from '@src/auth/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { MsgDto } from '@src/common/dto/msg.dto';
import { TokenDto } from './dto/token.dto';
import { LoginCheckDto } from './dto/loginCheck.dto';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenDto> {
    try {
      const userId = await this.userService.create(createUserDto);
      const user = await this.userService.findById(userId);
      const { accessToken, refreshToken } = await this.authService.login(user);

      setJwtCookie(res, refreshToken);
      return { accessToken };
    } catch (e) {
      throw new BadRequestException('Could not signup', { cause: e });
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() _loginDto: LoginDto,
  ): Promise<TokenDto> {
    if (!req.user) {
      throw new ForbiddenException('Could not login');
    }

    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );

    setJwtCookie(res, refreshToken);
    return { accessToken };
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('is-logged-in')
  async isLoggedIn(): Promise<LoginCheckDto> {
    return { isLoggedIn: true };
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  async logout(@Req() req: Request): Promise<MsgDto> {
    if (!req.user) {
      throw new ForbiddenException();
    }

    try {
      await this.authService.logout(req.user);
      return { msg: 'Logged out' };
    } catch (err) {
      throw new ForbiddenException('forbbiden', { cause: err });
    }
  }

  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh-token')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenDto> {
    if (!req.user) {
      throw new BadRequestException('Could not login');
    }
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      req.user,
    );

    setJwtCookie(res, refreshToken);
    return { accessToken };
  }
}

function cookieOptions() {
  const IS_PROD = isProd();
  const path = '/api/v1/auth/jwt-refesh';

  const options: CookieOptions = {
    httpOnly: true, // to disable accessing cookie via client side js
    sameSite: IS_PROD,
    path: path,
    secure: IS_PROD, // to force https (if you use it)
    maxAge: 1000 * 60 * 60 * 24 * 7, // ttl in seconds (remove this option and cookie will die when browser is closed)
    signed: true, // if you use the secret with cookieParser
  };
  return options;
}

function setJwtCookie(res: Response, refreshToken: string) {
  res.cookie('jwt-refresh', refreshToken, cookieOptions());
}

function isProd() {
  if (process.env.NODE_ENV === 'production') {
    return true;
  }

  return false;
}
