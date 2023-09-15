import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server, Socket} from 'socket.io'
import { ChatService } from './chat.service';


@WebSocketGateway({
  origin:"*",
  namespace:"chat"
})

export class ChatGateway implements OnGatewayConnection{
  constructor(private chatService:ChatService) {}

  @WebSocketServer()
  server : Server;

  private connectedUsers = new Map<String, Socket[]> ();

  handleConnection(client:Socket) {
    // get the user Id
    // if the user is not found diconnnect the socket
    // check if the userId is already have a socket in the map
    // if not create one

    const user = client.handshake.headers['userid'] as string;

    // console.log(user);
    // console.log(`Socket Created ${user}`);

    if (!user)
      client.disconnect();
    
    // if (this.connectedUsers.has(user.toString())){
    //   this.connectedUsers.get(user.toString()).push(client);
    // }else
    // {
    //   this.connectedUsers.set(user.toString(), [client]);
    // }

    client.join(user);
  }

  @SubscribeMessage('sendDM')
  async sendDM(client: Socket, @MessageBody() data:{
    from:string,
    to:string,
    message:string
  })
  {
    await this.chatService.createDirectMessage(data.from, data.to, data.message);
    this.server.to(data.to).emit("sendDM", data); // send the message the other user and handling the addition of the message on the front for the sender
  }

  @SubscribeMessage('sendCM')
  SendChannelM(Socket: Socket, @MessageBody() data:any){

  }
}
