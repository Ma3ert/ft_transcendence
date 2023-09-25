import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from '../auth.service';

type LoggedInUser = {
  user: User;
};

export type AuthSocket = Socket & LoggedInUser;

@Injectable()
export class WsLoggedInGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    if (context.getType() !== 'ws') return true;

    const client: AuthSocket = context.switchToWs().getClient();
    const { authorization } = client.handshake.headers;
    if (!authorization) return false;
    const user = await this.authService.getTokenUser(authorization);
    if (!user) return false;
    client.user = user;
    return true;
  }
}
