import { ApiPropertyOptional } from '@nestjs/swagger';
import { PlainObject } from '@mikro-orm/core';
import {
  IsEmail,
  IsNotEmpty,
  IsBoolean,
  IsString,
  IsArray,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { Connection } from '../email.service';

abstract class CreateBaseEmailAccount extends PlainObject {
  type: 'password' | 'oauth';

  @IsNotEmpty()
  @IsEmail()
  emailAddr: string;

  @IsNotEmpty()
  @IsString()
  markedMailboxPath = 'Tapestick';

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  whiteList: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  blackList: string[];

  @IsNotEmpty()
  @IsBoolean()
  canWLContacts: boolean;

  @IsNotEmpty()
  @IsBoolean()
  canBLContacts: boolean;

  @IsNotEmpty()
  @IsBoolean()
  canWLDomain: boolean;

  @IsNotEmpty()
  @IsBoolean()
  canWLRemoved: boolean;

  @IsNotEmpty()
  @IsString()
  host: string;

  @IsNotEmpty()
  @IsNumber()
  port: number;

  @IsNotEmpty()
  @IsBoolean()
  isSecure: boolean;
}

export class CreatePassEmailAccDto extends CreateBaseEmailAccount {
  @IsNotEmpty()
  @IsString()
  type: 'password';

  @IsNotEmpty()
  @IsString()
  pass: string;
}

export class CreateOauthEmailAccDto extends CreateBaseEmailAccount {
  @IsNotEmpty()
  @IsString()
  type: 'oauth';

  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @IsNotEmpty()
  @IsString()
  refreshLink: string;
}

export function isOauth(
  dto: CreateOauthEmailAccDto | CreatePassEmailAccDto,
): dto is CreateOauthEmailAccDto {
  return dto.type === 'oauth';
}

export function isPass(
  dto: CreateOauthEmailAccDto | CreatePassEmailAccDto,
): dto is CreatePassEmailAccDto {
  return dto.type === 'password';
}

export function dtoToConnection(
  dto: CreateOauthEmailAccDto | CreatePassEmailAccDto,
): Connection {
  if (isPass(dto)) {
    return {
      host: dto.host,
      port: dto.port,
      secure: dto.isSecure,
      auth: {
        type: 'password',
        user: dto.emailAddr,
        pass: dto.pass,
      },
    };
  } else {
    return {
      host: dto.host,
      port: dto.port,
      secure: dto.isSecure,
      auth: {
        type: 'oauth',
        user: dto.emailAddr,
        accessToken: dto.accessToken,
      },
    };
  }
}
