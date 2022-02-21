import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { Payload } from './security/payload.interafce';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/user.entity';
import { UserAuthority } from 'src/domain/user-authority.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //* 회원 가입
  async registerNewUser(newUser: UserDTO) {
    const existsUser = await this.userService.findByFields({
      where: {
        username: newUser.username,
      },
    });

    if (existsUser) {
      throw new HttpException('Username already used', HttpStatus.BAD_REQUEST);
    }

    return await this.userService.save(newUser);
  }

  //* 로그인
  async validateUser(userDTO: UserDTO) {
    const existsUser = await this.userService.findByFields({
      where: {
        username: userDTO.username,
      },
    });

    if (!existsUser) {
      throw new UnauthorizedException();
    }

    const validatePassword = await bcrypt.compare(
      userDTO.password,
      existsUser.password,
    );

    if (!validatePassword) {
      throw new UnauthorizedException();
    }

    this.flatAuthorities(existsUser);

    //? JWT의 payload값을 설정하고 서명한 후 리턴한다.

    const payload: Payload = {
      id: existsUser.id,
      username: existsUser.username,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  //* 토큰 유효성
  async tokenValidateUser(payload: Payload) {
    const existsUser = await this.userService.findByFields({
      where: {
        id: payload.id,
      },
    });

    this.flatAuthorities(existsUser);

    return existsUser;
  }

  //? user 엔티티의 {eager:true} 설정으로  user-authority의 엔티티까지 조인해서 오기때문에
  //? authority_name 칼럼만 따로 뽑아서 가져온다.
  private flatAuthorities(user: User): User {
    if (user && user.authorities) {
      user.authorities = user.authorities.map(
        (item: UserAuthority) => item.authorityName,
      );
    }
    return user;
  }
}
