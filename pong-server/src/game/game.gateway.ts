import { UseGuards } from '@nestjs/common';
import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { WsLoggedInGuard } from 'src/auth/utils/WsLoggedIn.guard';
import { SocketAuthMiddlware } from 'src/auth/utils/WsMiddlware';

@UseGuards(WsLoggedInGuard)
@WebSocketGateway({namespace: 'game', cors: {
  origin: ['*'],
  credentials: true
}})

export class GameGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('inviteUser')
  sendMatchInvite(client: Socket, payload: any)
  {
    // Logic for inviting a user
  }

  @SubscribeMessage('gameEvent')
  handleGameEvent(client: Socket, payload: any)
  {

  }

  // Using auth middlware
  afterInit(client: Socket)
  {
    client.use(SocketAuthMiddlware() as any)
  }
}
