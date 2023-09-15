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


  // connected Users sockets.
  private connectedUsers = new Map<String, Socket[]> ();

  handleConnection(client:Socket) {
    const user = client.handshake.headers['userid'] as string;

    if (!user)
      client.disconnect();

    if (this.connectedUsers.has(user)){
      this.connectedUsers.get(user).push(client);
    }
    else{
      this.connectedUsers.set(user, [client]);
    }

    client.join(user);

    client.on("disconnect",() => {
      console.log(`the client with the socketID: ${client.id} is disconnected.`);
      console.log(this.connectedUsers);
      for (const [user, sockets] of this.connectedUsers.entries()){
        if (sockets.includes(client)){
          const index = sockets.indexOf(client);
          if (index !== -1){
            sockets.splice(index, 1);
            if (sockets.length === 0){
              this.connectedUsers.delete(user);
            }
          }
        }
      }
    })
  }

  @SubscribeMessage('sendDM')
  async sendDM(client: Socket, @MessageBody() data:{
    from:string,
    to:string,
    message:string
  })
  {
    await this.chatService.createDirectMessage(data.from, data.to, data.message);
    this.server.to(data.from).emit("sendDM", data);
    this.server.to(data.to).emit("sendDM", data); // send the message the other user and handling the addition of the message on the front for the sender
  }

  @SubscribeMessage('sendCM')
  SendChannelM(Socket: Socket, @MessageBody() data:any){

  }
}
