import { IsBoolean, IsNotEmpty } from 'class-validator';

export class LoginCheckDto {
  @IsBoolean()
  @IsNotEmpty()
  isLoggedIn: boolean;
}
