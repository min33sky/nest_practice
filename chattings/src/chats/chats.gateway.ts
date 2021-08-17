import { Socket as SocketModel } from './models/sockets.model';
import { Chatting } from './models/chattings.model';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Model } from 'mongoose';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger(ChatsGateway.name);

  constructor(
    @InjectModel(Chatting.name) private chattingModel: Model<Chatting>,
    @InjectModel(SocketModel.name) private socketModel: Model<SocketModel>,
  ) {}

  async handleDisconnect(socket: Socket) {
    this.logger.debug(`disconnected : ${socket.id} ${socket.nsp.name}`);

    const user = await this.socketModel.findOne({ id: socket.id });
    if (user) {
      socket.broadcast.emit('disconnect_user', user.username);
      await user.delete(); //? 익명 채팅이기때문에 정보를 삭제한다.
    }
  }

  handleConnection(socket: Socket) {
    this.logger.debug(`connected: ${socket.id} ${socket.nsp.name}`);
  }

  afterInit() {
    this.logger.debug('Socket.IO Init');
  }

  @SubscribeMessage('new_user')
  async handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    //* username의 중복 여부를 확인 후 중복일 경우 처리를 해준다.
    const exist = await this.socketModel.exists({ username });
    if (exist) username = `${username}_${Math.floor(Math.random() * 100)}`;

    await this.socketModel.create({
      id: socket.id,
      username,
    });

    //? 브로드캐스트: 연결 된 모든 소켓에 이벤트를 발생시킨다.
    socket.broadcast.emit('user_connected', username);

    //? return한 값은 'new_user' 이벤트를 발생한 곳에서 콜백으로 받을 수 있다.
    return username;
  }

  @SubscribeMessage('submit_chat')
  async handleChat(
    @MessageBody() chat: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const socketObj = await this.socketModel.findOne({ id: socket.id });

    await this.chattingModel.create({
      user: socketObj,
      chat,
    });

    socket.broadcast.emit('new_chat', {
      chat,
      username: socketObj.username,
    });
  }
}
