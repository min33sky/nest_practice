import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { CatsRepository } from 'src/cats/cats.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly catsRepository: CatsRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    //* 해당하는 email이 있는지
    const cat = await this.catsRepository.findCatByEmail(email);

    if (!cat) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    //* password가 일치하는지
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const payload = { eamil: email, sub: cat.id }; // sub: 토큰 제목

    return {
      token: this.jwtService.sign(payload), // 페이로드를 서명한 토큰 값을 건네준다
    };
  }
}
