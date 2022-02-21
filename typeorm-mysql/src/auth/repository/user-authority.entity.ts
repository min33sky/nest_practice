import { UserAuthority } from 'src/domain/user-authority.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserAuthority)
export class UserAuthorityRepository extends Repository<UserAuthority> {}
