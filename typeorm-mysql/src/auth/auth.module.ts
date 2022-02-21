import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserAuthorityRepository } from './repository/user-authority.entity';
import { UserRepository } from './repository/user.repository';
import { JWTStrategy } from './security/passport.jwt.strategy';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, UserAuthorityRepository]),
    JwtModule.register({
      secret: '!@#QWE#@!',
      signOptions: {
        expiresIn: '300s',
      },
    }),
    PassportModule,
  ],
  exports: [TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, JWTStrategy],
})
export class AuthModule {}
