import { User } from 'src/auth/user.entity';
import { BoardStatus } from 'src/boards/board-status.enum';
import {
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Board extends BaseEntity {
  /**
   *? Entity: database의 table로 mapping되는 class
   */

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  title: string;

  @Column('text')
  description: string;

  @Column()
  status: BoardStatus;

  @ManyToOne((type) => User, (user) => user.Board, { eager: false })
  User: User;
}
