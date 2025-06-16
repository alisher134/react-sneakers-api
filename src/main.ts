import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const configService = app.get(ConfigService);

  const appPrefix = configService.get<string>('APP_PREFIX', 'api/v1');
  app.setGlobalPrefix(appPrefix);

  const port = configService.get<number>('PORT', 8080);
  await app.listen(port, () => {
    logger.log(`🚀 Server is running at port: ${port}`);
  });
}
bootstrap().catch((err) => console.log(err));
