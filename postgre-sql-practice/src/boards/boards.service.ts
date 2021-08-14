import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from 'src/boards/board-status.enum';
import { Board } from 'src/boards/board.entity';
import { BoardRepository } from 'src/boards/board.repository';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository) private boardRepository: BoardRepository,
  ) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }

  async getAllBoardById(id: number) {
    const query = this.boardRepository.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: id });

    const boards = await query.getMany();

    return boards;
  }

  createBoard(createBoardDto: CreateBoardDto, user: User) {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  getBoardById(id: number) {
    return this.boardRepository.getBoardById(id);
  }

  deleteBoard(id: number, user: User) {
    return this.boardRepository.deleteBoard(id, user);
  }

  updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    return this.boardRepository.updateBoardStatus(id, status);
  }
}
