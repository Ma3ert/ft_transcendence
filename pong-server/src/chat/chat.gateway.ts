import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server, Socket} from 'socket.io'

@WebSocketGateway({
  origin:"*",
  namespace:"chat"
})

export class ChatGateway implements OnGatewayConnection{

  @WebSocketServer()
  server : Server;

  handleConnection(client:Socket) {
    console.log(client.id);
  }

  @SubscribeMessage('message')
  handleMessage(Socket: Socket) {
    
  }
  
}
