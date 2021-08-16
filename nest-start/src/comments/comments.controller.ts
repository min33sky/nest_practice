import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsService } from 'src/comments/comments.service';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  private logger = new Logger(CommentsController.name);
  constructor(private commentsService: CommentsService) {}

  @ApiOperation({
    summary: '모든 고양이 프로필에 적힌 회원 댓글 가져오기',
  })
  @Get('all')
  async getAllComments() {
    this.logger.debug(`모든 댓글을 가져오는 요청`);
    return this.commentsService.getAllComments();
  }

  @ApiOperation({
    summary: '특정 고양이 프로필에 댓글 남기기',
  })
  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    this.logger.debug(`${id} 고양이에게 댓글 남기기`);
    return this.commentsService.createComment(id, createCommentDto);
  }

  @ApiOperation({
    summary: '좋아요 요청',
  })
  @Patch(':id')
  async plusLike(@Param('id') id: string) {
    this.logger.debug(`${id} 댓글에 좋아요 요청`);
    return this.commentsService.plusLike(id);
  }
}
