import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { AuthSocket, WsLoggedInGuard } from 'src/auth/utils/WsLoggedIn.guard';
import { SocketAuthMiddlware } from 'src/auth/utils/WsMiddlware';
import { GameService } from './game.service';

@UseGuards(WsLoggedInGuard)
@WebSocketGateway({
  namespace: 'game',
  cors: {
    origin: ['*'],
    credentials: true,
  },
})
export class GameGateway implements OnGatewayInit {
  constructor(private readonly gameService: GameService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinGame')
  sendMatchInvite(client: AuthSocket) {
    this.gameService.joinGameQueue(client, this.server);
  }

  @SubscribeMessage('gameEvent')
  handleGameEvent(client: Socket, payload: any) {}

  @SubscribeMessage('joinGame')
  joinGameQueue() {}

  afterInit(client: Socket) {
    client.use(SocketAuthMiddlware() as any);
    this.gameService.gameSessionLauncher(this.server);
  }
}
