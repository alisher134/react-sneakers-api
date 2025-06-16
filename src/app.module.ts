import { Module } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [InfraModule, ApiModule],
})
export class AppModule {}
