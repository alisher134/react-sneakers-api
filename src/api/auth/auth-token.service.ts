import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthTokenPayload } from './auth.types';

@Injectable()
export class AuthTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokens(payload: AuthTokenPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return { accessToken, refreshToken };
  }

  async generateAccessToken(payload: AuthTokenPayload) {
    return this.jwtService.signAsync(payload, { expiresIn: '15m' });
  }

  async generateRefreshToken(payload: AuthTokenPayload) {
    return this.jwtService.signAsync(payload, { expiresIn: '7d' });
  }

  async verifyToken<T extends object>(token: string): Promise<T> {
    return this.jwtService.verifyAsync(token);
  }
}
