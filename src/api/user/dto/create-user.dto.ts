import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @MinLength(8)
  password: string;
}
