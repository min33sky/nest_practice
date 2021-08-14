import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';
import { UserRepository } from 'src/auth/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialDto: AuthCredentialDto) {
    return this.userRepository.createUser(authCredentialDto);
  }

  async signIn(authCredentialDto: AuthCredentialDto) {
    const { username, password } = authCredentialDto;

    const exists = await this.userRepository.findOne({ username });
    if (!exists) throw new NotFoundException('존재하지 않는 회원입니다.');

    const comparePassword = await bcrypt.compare(password, exists.password);
    if (!comparePassword) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    return {
      access_token: this.jwtService.sign({ username, sub: exists.id }),
    };
  }
}
