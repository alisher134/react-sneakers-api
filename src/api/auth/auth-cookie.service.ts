import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CookieOptions, Response } from 'express';

import { IS_DEV_ENV } from '@/common/utils/is-dev';

@Injectable()
export class AuthCookieService {
  constructor(private readonly configService: ConfigService) {}

  setRefreshToken(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + 7);

    res.cookie('refreshToken', refreshToken, this.cookieOptions(expiresIn));
  }

  removeRefreshToken(res: Response) {
    const expiresIn = new Date(0);

    res.cookie('refreshToken', '', this.cookieOptions(expiresIn));
  }

  private cookieOptions(expires: Date): CookieOptions {
    return {
      httpOnly: true,
      domain: this.configService.get<string>('DOMAIN', 'localhost'),
      sameSite: IS_DEV_ENV ? 'none' : 'lax',
      secure: true,
      expires,
    };
  }
}
