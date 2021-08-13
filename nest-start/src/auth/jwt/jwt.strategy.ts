import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Payload } from 'src/auth/jwt/jwt.payload';
import { CatsRepository } from 'src/cats/cats.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더의 Bearer [token값]에서 JWT 추출
      ignoreExpiration: false, // 만료 기간 무시
      secretOrKey: process.env.JWT_SECRET, // 비밀키
    });
  }

  //? decoding된 token을 검증하는 부분
  async validate(payload: Payload) {
    const cat = await this.catsRepository.findCatByIdWithoutPassword(
      payload.sub,
    );

    if (cat) {
      return cat; //? req.user에 정보가 저장된다.
    } else {
      throw new UnauthorizedException('접근 불가');
    }
  }
}
