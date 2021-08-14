import { NestFactory } from '@nestjs/core';
import { QueryFailedExceptionFilter } from 'src/common/exceptionFilters/queryFailed-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new QueryFailedExceptionFilter());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
