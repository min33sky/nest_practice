import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { BoardStatus } from 'src/boards/board-status.enum';

@Injectable()
export class BoardStatusValidatePipe implements PipeTransform {
  /**
   * ? Enum에 있는 값이지 확인하는 인증 파이프
   */
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: string) {
    if (typeof value !== 'string')
      throw new BadRequestException(`$status ${value} is Wrong type`);

    value = value.toUpperCase(); //? 대문자로 변경

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status`);
    }

    return value;
  }

  private isStatusValid(status: string) {
    if (status in BoardStatus) return true;
    return false;
  }
}
