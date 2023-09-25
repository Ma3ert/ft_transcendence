import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
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

export class ChatGateway implements OnGatewayInit, OnGatewayDisconnect{
  constructor(private chatService:ChatService,
              private notificationService:NotificationService,
              ) {}

  private LoggedInUsers =   new Map<String, AuthSocket[]> ();
  private activeUsers   =   new Map<String, AuthSocket[]> ();
  
  @WebSocketServer()
  server : Server;


  afterInit(client: Socket) {
    client.use(SocketAuthMiddlware() as any);
  }

  handleDisconnect(client: AuthSocket) {
    
  }

  @SubscribeMessage('userLoggedIn')
  async userLoggeIn(client:AuthSocket, data:{userId:string}){
    const user : string = client.user.id;

    if (this.LoggedInUsers.has(user)){
      this.LoggedInUsers.get(user).push(client);
    }
    else{
      this.LoggedInUsers.set(user, [client]);
    }
    client.join(data.userId);
    this.userJoinHisChannel(data.userId, client);
    // await this.checkUserNotification(user, data.userSocket);
  }

  @SubscribeMessage('userLoggedOut')
  async userLoggedOut(client:AuthSocket)
  {
    const user:string = client.user.id;
    if (this.LoggedInUsers.has(user))
    {
      // delete all logged and active socket from the map
      this.LoggedInUsers.delete(user);
      this.activeUsers.delete(user);
    }
  }

  // user join room contains the channel id of his channels
  async userJoinHisChannel(user:string, userSocket:AuthSocket)
  {
    const userChannels = await this.chatService.getUserChannels(user);
    for (const user of userChannels)
      userSocket.join(user.channelId);
  }

  async checkUserNotification(user:string, userSocket:AuthSocket)
  {
    const data = await this.notificationService.userCheckNotification(user);
    userSocket.emit("checkNotification",{userId:user, data});
  }


  @SubscribeMessage('userIsActive')
  async userIsActive(client:AuthSocket, data:{userId:string}){
    if (this.activeUsers.has(data.userId))
      this.activeUsers.get(data.userId).push(client);
    else
      this.activeUsers.set(data.userId, [client]);
    // await this.checkChatNotification(data.socketId);
  }

  // check chat notification
  // async checkChatNotification(UserSocket:AuthSocket)
  // {

  // }

  @SubscribeMessage('checkStatus')
  async checkStatus(client:AuthSocket, data:{userId:string})
  {
    let status:string = "OFFLINE";

    if (this.activeUsers.has(data.userId))
      status = "ONLINE";
    client.emit("checkStatus", {status:status});
  }

  @SubscribeMessage('userIsNotActive')
  async UserIsNotActive(client:AuthSocket, data:{userId:string})
  {
    if (this.activeUsers.has(data.userId))
    {
      // delete the user socket from the activeUsers sockets.
      const userSockets = this.activeUsers.get(data.userId);
      const socketToDelete = userSockets.indexOf(client);

      if (socketToDelete !== -1)
      {
        userSockets.splice(socketToDelete, 1);
        this.activeUsers.set(data.userId, userSockets);
      }
    }
  }

  @SubscribeMessage('DM')
  async sendDM(client:AuthSocket, data:{
    from:string,
    to:string,
    message:string,
    game:boolean
  })
  {
    if (data.game === false)
      await this.chatService.createDirectMessage(data.from, data.to, data.message);
    this.server.to(data.from).emit("DM", data);
    this.server.to(data.to).emit("DM", data);
  }

  @SubscribeMessage('CM')
  async sendCM(client:AuthSocket, data:{
    from:string,
    channel:string,
    message:string
  })
  {
    await this.chatService.createChannelMessage(data.from, data.channel, data.message);
    this.server.to(data.channel).emit("CM", data);
  }

  @SubscribeMessage('readChatNotification')
  async readChatNotification(client: AuthSocket, data:{type:string, Id:string})
  {
    // check the notification table and change the read field from false to true.

  }
  // To-Do Setup events
  // userLoggedIn
  // userLoggedOut
  // checkNotification
  // userIsActive
  // userisNotActive
  // checkStatus
  // DM
  // CM
  // checkChatNotification
  // readChatNotification {type:CM, DM, id:}
}
