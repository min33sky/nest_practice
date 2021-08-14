import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  //* 회원 가입
  async createUser(authCredentialDto: AuthCredentialDto) {
    const { username, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hash });
    return await this.save(user);
  }
}
