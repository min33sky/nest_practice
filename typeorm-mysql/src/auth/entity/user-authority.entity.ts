import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_authority')
export class UserAuthority {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('varchar', { name: 'authority_name' })
  authorityName: string;

  //? User 엔티티와 조인할 칼럼 설정

  @ManyToOne(() => User, (user) => user.authorities)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
