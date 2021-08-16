import { BadRequestException, Injectable } from '@nestjs/common';
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

  async getAllComments(): Promise<Comments[]> {
    try {
      const comments = await this.commentsModel.find();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(id: string, createCommentDto: CreateCommentDto) {
    try {
      //? 댓글을 달 대상이 있는지 확인
      const targetCat = await this.catsRepository.findCatByIdWithoutPassword(
        id,
      );
      const { author, contents } = createCommentDto;

      //? 댓글 작성자의 정보를 확인
      const validatedAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author);

      const newComment = await this.commentsModel.create({
        author: validatedAuthor._id,
        contents,
        info: targetCat._id,
      });

      return await newComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(id: string) {
    try {
      const comment = await this.commentsModel.findById(id);
      comment.likeCount += 1;
      return await comment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
