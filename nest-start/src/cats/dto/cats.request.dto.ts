import { PickType } from '@nestjs/swagger';
import { Cat } from 'src/cats/cats.schema';

export class CatsRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
