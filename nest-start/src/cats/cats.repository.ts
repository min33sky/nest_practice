import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CatDocument } from 'src/cats/cats.schema';
import { CatsRequestDto } from 'src/cats/dto/cats.request.dto';

@Injectable()
export class CatsRepository {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<CatDocument>,
  ) {}

  async findAll() {
    return await this.catModel.find();
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = `http://localhost:8000/media/${fileName}`;
    const newCat = await cat.save();
    console.log('newCat: ', newCat);
    return newCat.readOnlyData;
  }

  async findCatByIdWithoutPassword(catId: string) {
    //? id값으로 고양이 정보를 가져오는데 패스워드 정보는 제거한다.
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = await this.catModel.exists({ email });
    return result;
  }

  async create(cat: CatsRequestDto): Promise<Cat> {
    return this.catModel.create(cat);
  }
}
