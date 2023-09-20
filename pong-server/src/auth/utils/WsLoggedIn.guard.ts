import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Socket } from "socket.io";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { AuthService } from "../auth.service";

type LoggedInUser = {
    user: User
}

export type AuthSocket = Socket & LoggedInUser

@Injectable()
export class WsLoggedInGuard implements CanActivate 
{
    constructor(private readonly userService: UsersService, private readonly authService: AuthService){}
    async canActivate(context: ExecutionContext) {
        if (context.getType() !== 'ws')
            return (true);

        const client: AuthSocket = context.switchToWs().getClient();
        const { authorization } = client.handshake.headers;

        const token = authorization.split(' ')[1];
        if (!token)
            return false;
        const decoded = await this.authService.verifyAccessToken(token);
        const user = await this.userService.findById(decoded.sub);
        client.user = user;
        return (true);
    }
}