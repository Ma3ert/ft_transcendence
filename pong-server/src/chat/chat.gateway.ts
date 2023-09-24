import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io'
import { ChatService } from './chat.service';
import { AuthSocket, WsLoggedInGuard } from 'src/auth/utils/WsLoggedIn.guard';
import { UseGuards } from '@nestjs/common';
import { SocketAuthMiddlware } from 'src/auth/utils/WsMiddlware';
import { NotificationService } from 'src/notification/notification.service';

@UseGuards(WsLoggedInGuard)
@WebSocketGateway({
  cors: {
    origin: ['*'],
    credentials: true,
  },
})

export class ChatGateway implements OnGatewayInit{
  constructor(private chatService:ChatService,
              private notificationService:NotificationService,
              ) {}
  private LoggedInUsers = new Map<String, AuthSocket[]> ();
  private activeUsers = new Map<String, AuthSocket[]> ();
  
  @WebSocketServer()
  server : Server;


  afterInit(client: Socket) {
    client.use(SocketAuthMiddlware() as any);
  }


  @SubscribeMessage('userLoggedIn')
  async userLoggeIn(client:AuthSocket, data:{userId:string, userSocket:AuthSocket}){
    const user = client.user.id;

    if (this.LoggedInUsers.has(user)){
      this.LoggedInUsers.get(user).push(client);
    }
    else{
      this.LoggedInUsers.set(user, [client]);
    }
    await this.checkUserNotification(user, data.userSocket);
  }

  async checkUserNotification(user:string, userSocket:AuthSocket)
  {
    const data = await this.notificationService.userCheckNotification(user);
    userSocket.emit("checkNotification",{userId:user, data});
  }


  @SubscribeMessage('userIsActive')
  async userIsActive(client:AuthSocket, data:{userId:string, socketId:AuthSocket}){
    if (this.activeUsers.has(data.userId))
      this.activeUsers.get(data.userId).push(data.socketId);
    else
      this.activeUsers.set(data.userId, [data.socketId]);
    await this.checkChatNotification(data.socketId);
  }
  
  async checkChatNotification(UserSocket:AuthSocket)
  {

  }

  @SubscribeMessage('checkStatus')
  async checkStatus(client:AuthSocket, data:{userId:string})
  {

  }

  @SubscribeMessage('userIsNotActive')
  async UserIsNotActive(client:AuthSocket, data:{userId:string, socketId:AuthSocket})
  {

  }

  @SubscribeMessage('DM')
  async sendDM(client:AuthSocket, data:{
    from:string,
    to:string,
    message:string,
    game:boolean
  })
  {

  }

  @SubscribeMessage('CM')
  async sendCM(client:AuthSocket, data:{
    from:string,
    channel:string,
    message:string
  })
  {

  }

}

  // handleConnection(client:AuthSocket) {
  //   const user = client.user;

    // if (!user)
    //   client.disconnect();

    // if (this.LoggedInUsers.has(user)){
    //   this.LoggedInUsers.get(user).push(client);
    // }
    // else{
    //   this.LoggedInUsers.set(user, [client]);
    // }
    
    // client.on("userLoggedIn", (data:{userId:string, socketId:Socket}) => {
    //   // emit the checkNotification event to all the users that belong the same socket
    //   // as the socketId.
    // })


    // on disconnect user 
  //   client.on("disconnect",() => {
  //     console.log(`the client with the socketID: ${client.id} is disconnected.`);
  //     console.log(this.LoggedInUsers);
  //     for (const [user, sockets] of this.LoggedInUsers.entries()){
  //       if (sockets.includes(client)){
  //         const index = sockets.indexOf(client);
  //         if (index !== -1){
  //           sockets.splice(index, 1);
  //           if (sockets.length === 0){
  //             this.LoggedInUsers.delete(user);
  //           }
  //         }
  //       }
  //     }
  //   })
  // }

  // @SubscribeMessage('DM')
  // async sendDM(@ConnectedSocket() client:AuthSocket, @MessageBody() data:{
  //   from:string,
  //   to:string,
  //   message:string,
  //   game:boolean
  // })
  // {
    // const RoomId = this.chatService.CreateRoomId(data.from, data.to);
    // const sender = this.connectedUsers.get(data.from);
    // const receiver = this.connectedUsers.get(data.to);
    // for (const socket of sender){
    //   socket.join(RoomId);
    // }
    // for (const socket of receiver){
    //   socket.join(RoomId);
    // }
    // if (!data.game){
    //   await this.chatService.createDirectMessage(data.from, data.to, data.message);
    // }
    // client.to(RoomId).emit("sendDM", data);
  // }

  // @SubscribeMessage('CM')
  // async SendChannelM(@ConnectedSocket() client:AuthSocket, @MessageBody() data:{
  //   from:string,
  //   channel:string,
  //   message:string
  // }){
    // const channelUsers = await this.chatService.getAllchannelMembers(data.channel);
    // for (const user of channelUsers){
    //   if (this.connectedUsers.has(user.userId)){
    //     const sockets = this.connectedUsers.get(user.userId);
    //     for (const socket of sockets){
    //       socket.join(data.channel);
    //     }
    //   }
    // }
    // await this.chatService.createChannelMessage(data.from, data.channel, data.message);
    // client.to(data.channel).emit("sendCM", data);
  // }

  // @SubscribeMessage('userIsActive')
  // async userIsActive(@ConnectedSocket() client:AuthSocket, @MessageBody() data:{
  // })

  // @SubscribeMessage('checkStatus')
  // async userIsActive(@ConnectedSocket() client:AuthSocket, @MessageBody() data:{
  // })
  
  // @SubscribeMessage('userIsNotactive')
  // async userIsActive(@ConnectedSocket() client:AuthSocket, @MessageBody() data:{
  // })

  // in case of new message emit the event of checkChatNotification
// }
