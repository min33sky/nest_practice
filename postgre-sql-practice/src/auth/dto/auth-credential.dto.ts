import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  //? 영어와 숫자만 받는다.
  @Matches(/^[a-zA-z0-9]*$/, {
    message: `password only accepts english and number`,
  })
  password: string;
}
