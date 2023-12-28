import { Module } from '@nestjs/common';
import { PartsService } from './service/parts.service';
import { PartsController } from './controller/parts.controller';

@Module({
  providers: [PartsService],
  controllers: [PartsController]
})
export class PartsModule {}
