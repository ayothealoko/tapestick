import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  ForbiddenException,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { ApiBearerAuth, ApiTags, OmitType } from '@nestjs/swagger';
import { Request } from 'express';
import {
  CreateOauthEmailAccDto,
  CreatePassEmailAccDto,
  dtoToConnection,
} from './dto/create-email-account.dto';
import { AccessTokenGuard } from '@src/auth/accessToken.guards';

@ApiTags('Email')
@Controller({ path: 'email', version: '1' })
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('account/pass')
  async createPass(
    @Body()
    createPassEmailAccDto: CreatePassEmailAccDto,
    @Req() req: Request,
  ) {
    const user = req.user;

    if (!user) {
      throw new ForbiddenException();
    }

    try {
      const canLogin = await this.emailService.tryLogin(
        dtoToConnection(createPassEmailAccDto),
      );

      if (!canLogin) {
        throw new BadRequestException('Email login failed');
      }

      await this.emailService.createPass(user.id, createPassEmailAccDto);
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) {
        throw err;
      }

      throw new BadRequestException('Could not create account', { cause: err });
    }
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('account/oauth')
  async createOauth(
    @Body()
    createOauthEmailAccDto: CreateOauthEmailAccDto,
    @Req() req: Request,
  ) {
    const user = req.user;

    if (!user) {
      throw new ForbiddenException();
    }

    try {
      const canLogin = await this.emailService.tryLogin(
        dtoToConnection(createOauthEmailAccDto),
      );

      if (!canLogin) {
        throw new BadRequestException('Email login failed');
      }

      await this.emailService.createOauth(user.id, createOauthEmailAccDto);
    } catch (err) {
      console.log(err);
      if (err instanceof HttpException) {
        throw err;
      }

      throw new BadRequestException('Could not create account', { cause: err });
    }
  }
}
