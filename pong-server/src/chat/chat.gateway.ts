import { ConnectedSocket, MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server, Socket} from 'socket.io'
import { ChatService } from './chat.service';
import { AuthSocket } from 'src/auth/utils/WsLoggedIn.guard';

@WebSocketGateway({
  origin:"*",
  namespace:"chat"
})

export class ChatGateway implements OnGatewayConnection{
  constructor(private chatService:ChatService) {}

  @WebSocketServer()
  server : Server;

  private connectedUsers = new Map<String, Socket[]> ();

  handleConnection(client:AuthSocket) {
    console.log(`Connected socket ${client.id}`);
    const user = client.user.id;

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
  async sendDM(@ConnectedSocket() client:AuthSocket, @MessageBody() data:{
    from:string,
    to:string,
    message:string,
    game:boolean
  })
  {
    const RoomId = this.chatService.CreateRoomId(data.from, data.to);
    const sender = this.connectedUsers.get(data.from);
    const receiver = this.connectedUsers.get(data.to);
    for (const socket of sender){
      socket.join(RoomId);
    }
    for (const socket of receiver){
      socket.join(RoomId);
    }
    if (!data.game){
      await this.chatService.createDirectMessage(data.from, data.to, data.message);
    }
    client.to(RoomId).emit("sendDM", data);
  }

  @SubscribeMessage('sendCM')
  async SendChannelM(@ConnectedSocket() client:AuthSocket, @MessageBody() data:{
    from:string,
    channel:string,
    message:string
  }){
    // check if the user is banned or muted
    // and after then you can save the message you want to sent in the database
    // for now i will write the logic like the user has the privileges to send a message.
    // get all the user in the channel and then join them to the room
    const channelUsers = await this.chatService.getAllchannelMembers(data.channel);
    for (const user of channelUsers){
      if (this.connectedUsers.has(user.userId)){
        const sockets = this.connectedUsers.get(user.userId);
        for (const socket of sockets){
          socket.join(data.channel);
        }
      }
    }
    await this.chatService.createChannelMessage(data.from, data.channel, data.message);
    client.to(data.channel).emit("sendCM", data);
  }

  @SubscribeMessage('NewMessage')
  async newMessage()
  {

  }
  
}
