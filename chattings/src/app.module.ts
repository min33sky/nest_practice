import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ChatsModule } from './chats/chats.module';
import * as mongoose from 'mongoose';
import { ChatsGateway } from 'src/chats/chats.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_URI, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    ChatsModule,
  ],
  controllers: [AppController],
  providers: [ChatsGateway],
})
export class AppModule implements NestModule {
  configure() {
    console.log('환경 변수: ', process.env.NODE_ENV === 'development');
    mongoose.set('debug', process.env.NODE_ENV === 'development');
  }
}
