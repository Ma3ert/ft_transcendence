import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Socket } from "socket.io";

@Injectable()
export class WSAuthGuard implements CanActivate 
{
    canActivate(context: ExecutionContext): boolean {
        if (context.getType() !== 'ws')
            return (true);

        const client: Socket = context.switchToWs().getClient();
        return (false);
    }
}