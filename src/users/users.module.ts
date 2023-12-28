import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './model/user.entity';
import { PartsModule } from 'src/parts/parts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => PartsModule),
    
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
