import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/user.decorator';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from 'src/boards/board-status.enum';
import { Board } from 'src/boards/board.entity';
import { BoardsService } from 'src/boards/boards.service';
import { CreateBoardDto } from 'src/boards/dto/create-board.dto';
import { BoardStatusValidatePipe } from 'src/boards/pipes/board-status.validate.pipe';

@Controller('api/boards')
@UseGuards(JwtAuthGuard)
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @CurrentUser() user: User,
  ) {
    return this.boardsService.createBoard(createBoardDto, user);
  }

  @Get(':id')
  getBoardById(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.getBoardById(id);
  }

  @Get('user/:id')
  getAllBoardsById(@Param('id', ParseIntPipe) id: number) {
    return this.boardsService.getAllBoardById(id);
  }

  @Delete(':id')
  removeBoard(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    return this.boardsService.deleteBoard(id, user);
  }

  @Patch(':id')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidatePipe) status: BoardStatus,
  ) {
    return this.boardsService.updateBoardStatus(id, status);
  }
}
