import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from 'src/cats/cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['name', 'email'] as const) {
  @ApiProperty({
    example: '1541341',
    description: 'id',
  })
  id: string;
}
