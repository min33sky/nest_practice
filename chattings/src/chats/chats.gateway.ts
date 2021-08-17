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

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger(ChatsGateway.name);

  handleDisconnect(socket: Socket) {
    this.logger.debug(`disconnected : ${socket.id} ${socket.nsp.name}`);
  }

  handleConnection(socket: Socket) {
    this.logger.debug(`connected: ${socket.id} ${socket.nsp.name}`);
  }

  afterInit() {
    this.logger.debug('init');
  }

  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    // socket.emit('hello_user', 'hello~ ' + username);
    //? return한 값은 'new_user' 이벤트를 발생한 곳에서 콜백으로 받을 수 있다.
    return username;
  }
}
