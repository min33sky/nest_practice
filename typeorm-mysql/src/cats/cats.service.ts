import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Cat } from '../domain/cats.entity';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catsRepository: Repository<Cat>) {}

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: string): Promise<Cat> {
    return this.catsRepository.findOne(id);
  }

  async create(cat: Cat): Promise<void> {
    await this.catsRepository.save(cat);
  }

  async remove(id: string): Promise<void> {
    await this.catsRepository.delete(id);
  }

  async update(id: string, cat: Cat): Promise<void> {
    const existCat = await this.catsRepository.findOne(id);
    if (existCat) {
      await getConnection()
        .createQueryBuilder()
        .update(Cat)
        .set({
          name: cat.name,
          age: cat.age,
          breed: cat.breed,
        })
        .where('id = :id', { id })
        .execute();
    }
  }
}
