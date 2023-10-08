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
import { ONGOING_MATCH, USER_OFFLINE } from './utils/events';

@UseGuards(WsLoggedInGuard)
@WebSocketGateway({
  namespace: 'game',
  cors: {
    origin: ['*'],
    credentials: true,
  },
})
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private socketUsers: Map<string, AuthSocket> = new Map();
  constructor(private readonly gameService: GameService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('who')
  getCurrentUser(client: AuthSocket) {
    this.server.to(client.id).emit('currentUser', client.user)
    // client.emit('currentUser', client.user);
  }

  @SubscribeMessage('gameJoinQueue')
  joinMatchmakingQueue(client: AuthSocket) {
    this.gameService.joinGameQueue(client, this.server);
  }

  @SubscribeMessage('gameSendInvite')
  sendGameInvite(client: AuthSocket, payload: any) {
    if (!this.socketUsers.has(payload.user)) {
      this.server.to(client.id).emit(USER_OFFLINE);
    }
    const sendingUser = client;
    const receivingUser = this.socketUsers.get(payload.user);
    this.gameService.createGameInvite(sendingUser, receivingUser, this.server);
  }

  @SubscribeMessage('gameCancelInvite')
  cancelGameInvite(client: AuthSocket, payload: any) {
    this.gameService.cancelGameInvite(client, payload.invite, this.server);
  }

  @SubscribeMessage('gameDenyInvite')
  denyGameInvite(client: AuthSocket, payload: any) {
    this.gameService.denyGameInvite(client, payload.invite, this.server);
  }

  @SubscribeMessage('gameAcceptInvite')
  handleGameEvent(client: AuthSocket, payload: any) {
    this.gameService.acceptGameInvite(client, payload.invite, this.server);
  }

  handleConnection(client: AuthSocket) {
    console.log("New User");
    if (!(this.socketUsers.size > 0 && this.socketUsers.has(client.user.id)))
      this.socketUsers.set(client.user.id, client);
  }

  handleDisconnect(client: AuthSocket) {
    this.gameService.leaveGameSession(client, this.server);
    if (this.socketUsers.has(client.user.id)) {
      this.socketUsers.delete(client.user.id);
    }
  }

  afterInit(client: Socket) {
    client.use(SocketAuthMiddlware() as any);
    // this.gameService.gameSessionLauncher(this.server).
  }
}
