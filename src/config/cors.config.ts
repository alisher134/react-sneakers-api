import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';

export const corsConfig = (configService: ConfigService): CorsOptions => {
  const allowedOrigins = configService.get<string>('ALLOWED_ORIGINS');
  const origins = allowedOrigins ? allowedOrigins.split(',').map((origin) => origin.trim()) : [];

  return {
    credentials: true,
    origin: origins,
  };
};
