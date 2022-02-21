import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repository/user.repository';
import { User } from 'src/domain/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async findByFields(
    options: FindOneOptions<UserDTO>,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne(options);
  }

  async save(userDTO: UserDTO) {
    await this.transformPassword(userDTO);
    console.log(userDTO);
    return await this.userRepository.save(userDTO);
  }

  //* 비밀번호 해쉬화
  async transformPassword(user: UserDTO) {
    user.password = await bcrypt.hash(user.password, 10);
    return Promise.resolve();
  }
}
