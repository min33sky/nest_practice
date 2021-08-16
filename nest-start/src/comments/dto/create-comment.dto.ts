import { PickType } from '@nestjs/swagger';
import { Comments } from 'src/comments/comments.schema';

export class CreateCommentDto extends PickType(Comments, [
  'author',
  'contents',
] as const) {}
