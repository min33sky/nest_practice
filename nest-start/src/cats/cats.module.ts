import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { CatsRepository } from 'src/cats/cats.repository';
import { Cat, CatSchema } from 'src/cats/cats.schema';
import { Comments, CommentsSchema } from 'src/comments/comments.schema';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [
    MulterModule.register({
      dest: 'upload', //? default 업로드 폴더임. 사용 안함
    }),
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      {
        name: Comments.name,
        schema: CommentsSchema,
      },
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],
})
export class CatsModule {}
