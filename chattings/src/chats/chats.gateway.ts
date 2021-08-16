import { Socket } from 'socket.io';
import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';

@WebSocketGateway()
export class ChatsGateway {
  @SubscribeMessage('new_user')
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(socket.id);
    socket.emit('hello_user', 'hello~ ' + username);
    //? return한 값은 'new_user' 이벤트를 발생한 곳에서 콜백으로 받을 수 있다.
    return 'Hello world!';
  }
}
