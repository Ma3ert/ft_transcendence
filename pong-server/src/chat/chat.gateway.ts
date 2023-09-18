import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
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
  async sendDM(@ConnectedSocket() client:Socket, @MessageBody() data:{
    from:string,
    to:string,
    message:string,
    game:boolean
  })
  {
    // create a roomId for DM
    // then join all the socket to the room.
    const RoomId = this.chatService.CreateRoomId(data.from, data.to);
    const from = this.connectedUsers.get(data.from);
    const to = this.connectedUsers.get(data.to);
    for (const val of from){
      val.join(RoomId);
    }
    for (const val of to){
      val.join(RoomId);
    }
    if (!data.game){
      await this.chatService.createDirectMessage(data.from, data.to, data.message);
    }
    client.to(RoomId).emit("sendDM", data);
  }

  @SubscribeMessage('sendCM')
  SendChannelM(@ConnectedSocket() client:Socket, @MessageBody() data:{
    from:string,
    channel:string,
    message:string
  }){
    // check if the user is banned or muted
    // and after then you can save the message you want to sent in the database
    // 
                        
  }
}
