import { NestFactory } from '@nestjs/core';
import { QueryFailedExceptionFilter } from 'src/common/exceptionFilters/queryFailed-exception.filter';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { HttpExceptionFilter } from 'src/common/exceptionFilters/http-exception.filter';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor.';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new QueryFailedExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());

  const serverConfig = config.get<{ port: number }>('server');

  await app.listen(serverConfig.port);

  logger.log(`Application running on port [${serverConfig.port}]`);
}
bootstrap();
