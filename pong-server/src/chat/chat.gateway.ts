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
import { UsersService } from 'src/users/users.service';
import { CHANNEL_EVENT_TYPE } from './entities/channelEventType.enum';


@UseGuards(WsLoggedInGuard) 
@WebSocketGateway({
  cors: {
    origin: ['*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Access-Control-Allow-Origin']
  },
  namespace:"chat",
})

export class ChatGateway implements OnGatewayInit, OnGatewayDisconnect{
  constructor(private chatService:ChatService,
              private notificationService:NotificationService,
              private usersService:UsersService
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
  async userLoggeIn(client:AuthSocket){
    const user : string = client.user.id;

    if (this.LoggedInUsers.has(user)){
      this.LoggedInUsers.get(user).push(client);
    }
    else{
      this.LoggedInUsers.set(user, [client]);
    }
    client.join(user);
    this.userJoinHisChannel(user, client);
    await this.checkUserNotification(user);
  }

  @SubscribeMessage('userLoggedOut')
  async userLoggedOut(client:AuthSocket)
  {
    const user:string = client.user.id;
    if (this.LoggedInUsers.has(user))
    {
      this.LoggedInUsers.delete(user);
      this.activeUsers.delete(user);
    }
    for (const usr of this.LoggedInUsers) {
      client.emit("checkStatus", {userId:user, status:"OFFLINE"});
    }
  }

  async userJoinHisChannel(user:string, userSocket:AuthSocket)
  {
    const userChannels = await this.chatService.getUserChannels(user);
    for (const user of userChannels)
      userSocket.join(user.channelId);
  }

  async checkUserNotification(user:string)
  {
    const data:{invites:boolean, chat:boolean} = await this.notificationService.checkUserNotification(user);
    this.server.to(user).emit("checkNotification",{userId:user, data});
  }

  @SubscribeMessage('userIsActive')
  async userIsActive(client:AuthSocket){
    const user = client.user.id;
  
    if (this.activeUsers.has(user))
      this.activeUsers.get(user).push(client);
    else
      this.activeUsers.set(user, [client]);
    client.join(user);
    this.userJoinHisChannel(user, client);
    await this.chatNotification(user);
  }

  async chatNotification(room:string)
  {
    const data:{DM:string[], CM:string[]} = await this.notificationService.chatNotification(room);
    this.server.to(room).emit("ChatNotification", data);
  }

  @SubscribeMessage('checkStatus')
  async checkStatus(client:AuthSocket, data:{userId:string})
  {
    let status:string = "OFFLINE";

    if (this.LoggedInUsers.has(data.userId))
      status = "ONLINE";
    client.emit("checkStatus", {userId:data.userId, status:status});
  }

  @SubscribeMessage('userIsNotActive')
  async UserIsNotActive(client:AuthSocket)
  {
    const user = client.user.id;
    if (this.activeUsers.has(user))
    {
      const userSockets = this.activeUsers.get(user);
      const socketToDelete = userSockets.indexOf(client);

      if (socketToDelete !== -1)
      {
        userSockets.splice(socketToDelete, 1);
        this.activeUsers.set(user, userSockets);
      }
    }
    this.activeUsers.delete(user);
    this.checkUserNotification(user);
  }

  @SubscribeMessage('DM')
  async sendDM(client:AuthSocket, data:{
    senderId:string,
    receiverId:string,
    message:string,
    game:boolean
  })
  {
    
    await this.chatService.createDirectMessage(data.senderId, data.receiverId, data.message);
    await this.notificationService.createDirectMessageNotification(data.senderId, data.receiverId);
    this.server.to(data.senderId).emit("DM", data);
    this.server.to(data.receiverId).emit("DM", data);
    this.checkUserNotification(data.receiverId);
    this.chatNotification(data.receiverId);
  }

  @SubscribeMessage('CM')
  async sendCM(client:AuthSocket, data:{
    senderId:string,
    channelId:string,
    message:string
  })
  {
    const channelMembers = await this.chatService.channelMembers(data.channelId, data.senderId);
    const userIndex = channelMembers.findIndex((user) => user.id === data.senderId);
    const user = channelMembers[userIndex];
    if (user && !user['banned'] && !user['muted']){
      await this.chatService.createChannelMessage(data.senderId, data.channelId, data.message);
      await this.notificationService.createChannelMessageNotification(data.senderId, data.channelId);
      const channelMembersIds = await this.chatService.getChannelMembersIds(data.channelId, data.senderId);
      this.server.to(data.channelId).emit("CM", data);
      for (const user of channelMembersIds)
      {
        if (user.userId != data.senderId)
        {
          await this.checkUserNotification(user.userId);
          await this.chatNotification(user.userId);
        }
      }
    }
  }

  @SubscribeMessage('readChatNotification')
  async readChatNotification(client: AuthSocket, data:{channel:boolean, Id:string})
  {
    if (data.channel === true)
      await this.notificationService.readChannelNotification(client.user.id, data.Id);
    else
      await this.notificationService.readDirectNotification(client.user.id, data.Id);
    await this.chatNotification(client.user.id);
  }

  @SubscribeMessage('typing')
  async typing(client: AuthSocket, data: { userId: string })
  {
    client.to(data.userId).emit("typing", { userId: client.user.id });
  }

  @SubscribeMessage('readInviteNotification')
  async readInviteNotification(client: AuthSocket) {
    await this.notificationService.readInviteNotification(client.user.id);
    this.checkUserNotification(client.user.id);
  }

  @SubscribeMessage('sendInvite')
  async sendInvite(client: AuthSocket, data:{receiverId:string}){
    this.checkUserNotification(data.receiverId);
  }

  @SubscribeMessage('channelEvent')
  async userKick(client: AuthSocket, data:{userId:string, channelId:string, type:CHANNEL_EVENT_TYPE}){
    client.to(data.channelId).emit("channelEvent", {userId: data.userId, channelId: data.channelId, type:data.type});
  }
}
