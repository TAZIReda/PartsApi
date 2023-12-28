import { Module, forwardRef } from '@nestjs/common';
import { PartsService } from './service/parts.service';
import { PartsController } from './controller/parts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartEntity } from './model/part.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PartEntity]),
    forwardRef(() => UsersModule),
    
  ],
  providers: [PartsService],
  controllers: [PartsController]
})
export class PartsModule {}
