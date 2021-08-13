import { BoardStatus } from 'src/boards/board-status.enum';
import { BaseEntity, Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

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
}
