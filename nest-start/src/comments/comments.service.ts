import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatsRepository } from 'src/cats/cats.repository';
import { Comments } from 'src/comments/comments.schema';
import { CreateCommentDto } from 'src/comments/dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private commentsModel: Model<Comments>,
    private catsRepository: CatsRepository,
  ) {}

  async getAllComments() {
    return 'all Comments';
  }

  async createComment(id: string, createCommentDto: CreateCommentDto) {
    return '댓글 작성';
  }

  async plusLike(id: string) {
    return '좋아요 요청';
  }
}
