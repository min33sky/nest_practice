import { NotFoundException } from '@nestjs/common';
import { BoardStatus } from 'src/boards/board-status.enum';
import { Board } from 'src/boards/board.entity';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  /**
   * ? Repository를 상속받기 때문에 this로 바로 repository의 method를 호출 가능
   */

  async getAllBoards() {
    return await this.find();
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    return await this.save(board);
  }

  async getBoardById(id: number): Promise<Board> {
    const board = await this.findOne(id);
    if (!board) throw new NotFoundException(`Can't find post by id ${id}`);
    return board;
  }

  async deleteBoard(id: number): Promise<number> {
    const result = await this.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Can't find Board with id ${id}`);
    return result.affected;
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;

    return await this.save(board);
  }
}
