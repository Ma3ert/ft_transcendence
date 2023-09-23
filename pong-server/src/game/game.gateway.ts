import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { AuthSocket, WsLoggedInGuard } from 'src/auth/utils/WsLoggedIn.guard';
import { SocketAuthMiddlware } from 'src/auth/utils/WsMiddlware';
import { GameService } from './game.service';
import { ONGOING_MATCH } from './utils/events';

@UseGuards(WsLoggedInGuard)
@WebSocketGateway({
  namespace: 'game',
  cors: {
    origin: ['*'],
    credentials: true,
  },
})
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private socketUsers: Map<string, AuthSocket> = new Map();
  constructor(
    private readonly gameService: GameService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('gameJoinQueue')
  joinMatchmakingQueue(client: AuthSocket) {
    this.gameService.joinGameQueue(client, this.server);
  }

  @SubscribeMessage('gameSendInvite')
  sendGameInvite(client: AuthSocket, payload: any) {
    //! Here i should check that the user we're trying to invite is online using the socketUsers map.
  }

  @SubscribeMessage('gameEvent')
  handleGameEvent(client: AuthSocket, payload: any) {
    console.log(client.id);
    this.server.to(client.id).emit('test');
  }

  handleConnection(client: AuthSocket) {
    if (this.socketUsers.size > 0 && this.socketUsers.has(client.user.id))
      return client.emit(ONGOING_MATCH);
    this.socketUsers.set(client.user.id, client);
  }

  handleDisconnect(client: AuthSocket) {
    //! Should the function that is reponsible for the player leaving the game session.
    console.log('User id:', client.user.id);
    if (this.socketUsers.has(client.user.id)) {
      this.socketUsers.delete(client.user.id);
    }
  }

  afterInit(client: Socket) {
    client.use(SocketAuthMiddlware() as any);
    this.gameService.gameSessionLauncher(this.server);
  }
}
