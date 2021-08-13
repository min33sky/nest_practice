import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...(successInterceptor)');

    // 성공한 요청일 경우 success: true를 추가해서 응답한다.
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
      tap((data) => console.log(data)),
    );
  }
}
