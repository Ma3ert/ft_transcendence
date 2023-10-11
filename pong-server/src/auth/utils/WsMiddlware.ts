import { verify } from 'jsonwebtoken';
import { AuthSocket } from './WsLoggedIn.guard';
import { PrismaService } from 'src/prisma/prisma.service';

export type SocketIOMiddlware = {
  (client: AuthSocket, next: (err?: Error) => void);
};

export const SocketAuthMiddlware = (): SocketIOMiddlware => {
  const prisma = new PrismaService();
  return async (client: AuthSocket, next) => {
    try {
      const { authorization } = client.handshake.headers;
      const token = (authorization || client.handshake.auth.token).split(' ')[1];
      if (!token) throw new Error('Could not find the authorization token');
      const payload = verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: {
          id: payload.sub as string,
        },
      });
      if (user) client.user = user;
      next();
    } catch (e) {
      next(e);
    }
  };
};
