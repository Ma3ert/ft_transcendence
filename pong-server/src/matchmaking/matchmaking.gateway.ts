import { UseGuards } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { WsLoggedInGuard } from 'src/auth/utils/WsLoggedIn.guard';
import { SocketAuthMiddlware } from 'src/auth/utils/WsMiddlware';

@UseGuards(WsLoggedInGuard)
@WebSocketGateway({namespace: 'matchmaking', cors: {
  origin: ['*'],
  credentials: true
}})

export class MatchmakingGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinGame')
  joinGameHandler(client: any, payload: any){
    // Here i should add the user to the queue and wait for the match
    if (client.user.status === "INMATCH")
      return this.server.emit('alreadyInMatch', 'The user is already subscribed to a game session.')
    console.log(client.user);
  }



  // sendMatchMaking()
  // {
  //   this.server.emit('matchmade', 'Hello from matchmaking.')
  // }

  afterInit(client: Socket)
  {
    client.use(SocketAuthMiddlware() as any)
  }

  handleConnection(client: Socket) {
    console.log("Client connected");
  }

  handleDisconnect(client: any) {
    console.log("Client disconnect");
  }
}
