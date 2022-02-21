import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserAuthority } from './user-authority.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => UserAuthority, (userAutority) => userAutority.user, {
    eager: true, //? 조회할 때 조인해서 값을 가져온다.
  })
  authorities?: any[];
}
