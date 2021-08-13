import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/jwt/jwt.strategy';
import { CatsModule } from 'src/cats/cats.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // 환경변수
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),

    JwtModule.register({
      secret: process.env.JWT_SECRET, // 비밀키
      signOptions: {
        expiresIn: '1y', // 1년
      },
    }),
    forwardRef(() => CatsModule), // 순환 참조를 막기 위해
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
