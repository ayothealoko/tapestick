import { IsNotEmpty, IsString } from 'class-validator';

export class MsgDto {
  @IsString()
  @IsNotEmpty()
  msg: string;
}
