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
      let payload;
      const { authorization } = client.handshake.auth.token;
      if (!authorization) throw new Error('Could not find the authroization token');
      const token = authorization.split(' ')[1];
      if (token) payload = verify(token, process.env.JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
      if (user) client.user = user;
      next();
    } catch (e) {
      next(e);
    }
  };
};
