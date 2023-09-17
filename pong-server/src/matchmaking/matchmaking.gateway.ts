import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({namespace: 'matchmaking', cors: {
  origin: ['*'],
  credentials: true
}})

export class MatchmakingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(payload);
    return 'Hello world!';
  }

  // sendMatchMaking()
  // {
  //   this.server.emit('matchmade', 'Hello from matchmaking.')
  // }

  handleConnection(client: Socket) {
    const user = client.request;

    const expressRequest = client.request;
    console.log("Client connected");
  }

  handleDisconnect(client: any) {
    console.log("Client disconnect");
  }
}
