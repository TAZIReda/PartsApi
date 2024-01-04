import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './service/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt-guard';
import { JwtStrategy } from './guards/jwt-strategy';

@Module({
    imports: [
            forwardRef(()=>UsersModule),
            JwtModule.registerAsync({ 
                imports:[ConfigModule],  
                inject:[ConfigService],
                useFactory: async (configService:ConfigService) => ({
                    // secret: configService.get('JWT_SECRET'),
                    secret:'helloworld',
                    signOptions: {expiresIn:'10000s'}
                })
            })
    ],
    providers: [AuthService, JwtAuthGuard, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
