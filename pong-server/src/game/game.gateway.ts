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
import { AuthService } from 'src/auth/auth.service';

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
    private readonly authService: AuthService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('gameJoinQueue')
  joinMatchmakingQueue(client: AuthSocket) {
    this.gameService.joinGameQueue(client, this.server);
  }

  @SubscribeMessage('gameSendInvite')
  sendGameInvite(client: AuthSocket, payload: any) {}

  @SubscribeMessage('gameEvent')
  handleGameEvent(client: AuthSocket, payload: any) {
    console.log(client.id);
    this.server.to(client.id).emit('test');
  }

  handleConnection(client: AuthSocket) {
    if (this.socketUsers.size > 0 && this.socketUsers.has(client.user.id))
    {
      console.log(client.id);
      console.log("Same client just getting the old one");
      const OldSocket = this.socketUsers.get(client.user.id);
      console.log(OldSocket.id);
      client = OldSocket;
      console.log(client.id);
      return;
    }
    client = null;
    // console.log("Setting new user in the map:", client.id);
    // this.socketUsers.set(client.user.id, client);
  }

  handleDisconnect(client: AuthSocket) {
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
