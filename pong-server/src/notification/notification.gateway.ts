import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { WsLoggedInGuard } from 'src/auth/utils/WsLoggedIn.guard';

@UseGuards(WsLoggedInGuard)
@WebSocketGateway({
  cors: {
    origin: ['*'],
    credentials: true,
  },
})

@WebSocketGateway()
export class NotificationGateway {
  
}
