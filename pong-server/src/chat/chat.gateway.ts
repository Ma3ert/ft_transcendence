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

@UseGuards(WsLoggedInGuard) 
@WebSocketGateway({
  cors: {
    origin: ['*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Access-Control-Allow-Origin']
  },
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

  // check chat notification
  async chatNotification(room:string)
  {
    const data:{DM:string[], CM:string[]} = await this.notificationService.chatNotification(room);
    this.server.to(room).emit("ChatNotification", data);
  }

  @SubscribeMessage('checkStatus')
  async checkStatus(client:AuthSocket, data:{userId:string})
  {
    let status:string = "OFFLINE";

    if (this.activeUsers.has(data.userId))
      status = "ONLINE";
    client.emit("checkStatus", {status:status});
  }

  @SubscribeMessage('userIsNotActive')
  async UserIsNotActive(client:AuthSocket)
  {
    const user = client.user.id;
    if (this.activeUsers.has(user))
    {
      // delete the user socket from the activeUsers sockets.
      const userSockets = this.activeUsers.get(user);
      const socketToDelete = userSockets.indexOf(client);

      if (socketToDelete !== -1)
      {
        userSockets.splice(socketToDelete, 1);
        this.activeUsers.set(user, userSockets);
      }
    }
    this.activeUsers.delete(user);
  }

  @SubscribeMessage('DM')
  async sendDM(client:AuthSocket, data:{
    sender:string,
    reciever:string,
    message:string,
    game:boolean
  })
  { // need some refactoring
    if (data.game === false)
    {
      await this.chatService.createDirectMessage(data.sender, data.reciever, data.message);
      await this.notificationService.createDirectMessageNotification(data.sender, data.reciever);
      //if user is logged in i will sent a checkNotificatoin event to all loggedIn users.
      this.server.to(data.sender).emit("DM", data);
      this.server.to(data.reciever).emit("DM", data);
      this.checkUserNotification(data.reciever);
      this.chatNotification(data.reciever);
    }
    else
    {
      this.server.to(data.sender).emit("DM", data);
      this.server.to(data.reciever).emit("DM", data);
    }
  }

  @SubscribeMessage('CM')
  async sendCM(client:AuthSocket, data:{
    sender:string,
    channel:string,
    message:string
  })
  {
    await this.chatService.createChannelMessage(data.sender, data.channel, data.message);
    await this.notificationService.createChannelMessageNotification(data.sender, data.channel);
    const channelMembers = await this.chatService.getChannelMembersIds(data.channel, data.sender);
    this.server.to(data.channel).emit("CM", data);
    for (const user of channelMembers)
    {
      if (user.userId != data.sender)
      {
        await this.checkUserNotification(user.userId);
        await this.chatNotification(user.userId);
      }
    }
  }

  @SubscribeMessage('readChatNotification')
  async readChatNotification(client: AuthSocket, data:{channel:boolean, Id:string})
  {
    // check the notification table and change the read field from false to true.
    if (data.channel === true)
      await this.notificationService.readChannelNotification(client.user.id, data.Id);
    else
      await this.notificationService.readDirectNotification(client.user.id, data.Id);
  }
}
