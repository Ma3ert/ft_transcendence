import { Socket } from "socket.io";
import { verify } from "jsonwebtoken";

export type SocketIOMiddlware = {
    (client: Socket, next: (err?: Error) => void)
}

export const SocketAuthMiddlware = (): SocketIOMiddlware => 
{
    return (client: Socket, next) => {
        try 
        {
            let payload;
            const { authorization} = client.handshake.headers;
            if (!authorization)
                throw new Error("Could not find the authroization token")
            const token = authorization.split(' ')[1];
            if (token)
                payload = verify(token, 'something werid to see');
            next();
        }
        catch(e)
        {
            next(e);
        }
    }
}