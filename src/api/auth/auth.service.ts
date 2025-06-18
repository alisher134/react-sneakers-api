import { BadGatewayException, Injectable, UnauthorizedException } from '@nestjs/common';
import { verify } from 'argon2';

import type { User } from '@/prisma/generated';

import { UserService } from '../user/user.service';

import { AuthTokenService } from './auth-token.service';
import type { AuthTokenPayload } from './auth.types';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  async register(dto: RegisterDto) {
    const isExists = await this.userService.getByEmail(dto.email);
    if (isExists) throw new BadGatewayException('Email is busy!');

    const user = await this.userService.create(dto);

    const payload: AuthTokenPayload = { id: user.id };
    return this.authTokenService.generateTokens(payload);
  }

  async login(dto: LoginDto) {
    const user: User = await this.validateUser(dto);

    const payload: AuthTokenPayload = { id: user.id };
    return this.authTokenService.generateTokens(payload);
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.userService.getByEmail(dto.email);
    if (!user) throw new BadGatewayException('Invalid email or password');

    const isValidPassword = await verify(user.password, dto.password);
    if (!isValidPassword) throw new BadGatewayException('Invalid email or password');

    return user;
  }

  async refresh(refreshToken: string) {
    const result = await this.authTokenService.verifyToken<AuthTokenPayload>(refreshToken);
    if (!result) throw new UnauthorizedException('Invalid refresh token!');

    const user = await this.userService.getById(result.id);

    const payload: AuthTokenPayload = { id: user.id };
    return this.authTokenService.generateAccessToken(payload);
  }
}
