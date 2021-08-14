import { NestFactory } from '@nestjs/core';
import { QueryFailedExceptionFilter } from 'src/common/exceptionFilters/queryFailed-exception.filter';
import { AppModule } from './app.module';
import * as config from 'config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new QueryFailedExceptionFilter());

  const serverConfig = config.get<{ port: number }>('server');

  await app.listen(serverConfig.port);

  Logger.log(`Application running on port ${serverConfig.port}`);
}
bootstrap();
