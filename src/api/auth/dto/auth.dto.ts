import { IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsString()
  email: string;

  @MinLength(8)
  password: string;
}
