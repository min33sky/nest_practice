import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRequestDto } from 'src/cats/dto/cats.request.dto';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from 'src/cats/cats.repository';
import { Cat } from 'src/cats/cats.schema';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }

  async signup(body: CatsRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catsRepository.existsByEmail(email);

    if (isCatExist)
      throw new UnauthorizedException('이미 존재하는 이메일입니다.');

    const hashedPasswrod = await bcrypt.hash(password, 10);

    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPasswrod,
    });

    return cat.readOnlyData;
  }

  async uploadImg(cat: Cat, files: Express.Multer.File[]) {
    //? 저장한 폴더 이름을 이미지 파일 앞에 붙인다.
    const fileName = `cats/${files[0].filename}`;

    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      fileName,
    );
    return newCat;
  }
}
