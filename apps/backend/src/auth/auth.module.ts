import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { HttpModule } from '@nestjs/axios';
import { OAuth2Strategy } from './oauth2.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ session: true }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get('jwt'),
      }),
      inject: [ConfigService],
    }),
    HttpModule,
  ],
  providers: [AuthService, JwtStrategy, OAuth2Strategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
