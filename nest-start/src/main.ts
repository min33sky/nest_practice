import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/common/exceptionFilters/http-exception.filter';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
//? Swagger 인증 모듈
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // class validation
  app.useGlobalFilters(new HttpExceptionFilter()); // http-exception

  //* 정적 파일 제공 미들웨어 (NestExpressApplication 타입 설정)
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media', //? http://localhost:8000/media/cats/abcdefg.png
  });

  //* swagger authorization
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  //* Swagger API document
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors({
    origin: true, //? 개발일 때만 true를 줘서 모든 접근이 가능하게 하자.
    credentials: true,
  });

  const PORT = process.env.PORT;
  await app.listen(PORT);

  logger.log(`Cats Server Start at [${PORT}]`);
}
bootstrap();
