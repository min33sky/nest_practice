import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('Http');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const { ip, originalUrl, method } = request;
    const userAgent = request.get('user-agent') || '';

    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `${method} ${originalUrl} ${
              context.switchToHttp().getResponse<Response>().statusCode
            } - ${userAgent} ${ip} ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
