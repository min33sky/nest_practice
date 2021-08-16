import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';
import { Comments } from 'src/comments/comments.schema';

//? 필요 없는거 같음
export type CatDocument = Cat & Document;

const options: SchemaOptions = {
  timestamps: true, // 생성, 수정 시간 자동 생성
};

@Schema(options)
export class Cat extends Document {
  @ApiProperty({
    example: 'cocoro@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'roopy',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '2#3!8%1@0',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'image',
  })
  @Prop({
    default: `https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg`,
  })
  @IsString()
  imgUrl: string;

  //? virtual field
  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
    comments: Comments[];
  };

  readonly comments: Comments[];
}

const _CatSchema = SchemaFactory.createForClass(Cat);

/**
 *? virtual field
 *: 실제로 저장되는 필드는 아니지만 비지니스 용도로 사용할 수 있는 필드
 *  예시) 비밀번호를 보내 줄 필요가 없을 때
 */
_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
  };
});

_CatSchema.virtual('comments', {
  ref: 'comments', //? 스키마
  localField: '_id',
  foreignField: 'info', //? info를 기준으로 댓글을 가져온다.
});
//? Populate를 사용할 때 옵션들 설정
_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
