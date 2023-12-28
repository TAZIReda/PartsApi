import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModuleOptions, TypeOrmModule } from '@nestjs/typeorm';
import { PartsModule } from './parts/parts.module';
import { UsersModule } from './users/users.module';

const ormOptions: TypeOrmModuleOptions = { 
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'parts',
  autoLoadEntities : true,
  synchronize : true,
}

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    PartsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
