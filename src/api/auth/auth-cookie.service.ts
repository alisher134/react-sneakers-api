import { Injectable } from '@nestjs/common';
import type { CookieOptions, Response } from 'express';

import { IS_DEV_ENV } from '@/common/utils/is-dev';

@Injectable()
export class AuthCookieService {
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
      domain: '',
      sameSite: IS_DEV_ENV ? 'none' : 'lax',
      secure: !IS_DEV_ENV,
      expires,
    };
  }
}
