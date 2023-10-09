import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { NotificationType } from '@prisma/client';
import { ChatService } from 'src/chat/chat.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { chatNotification } from './entities/chatNotification.entity';

@Injectable()
export class NotificationService {
    constructor (
        private prismaService:PrismaService,
        @Inject(forwardRef(() => ChatService))
        private chatService:ChatService){}

    
    async createFriendInviteNotification(sender:string, receiver:string)
    {
        await this.prismaService.notification.create({
            data:{
                userId:receiver,
                senderId:sender,
                type:NotificationType.FRIENDINVITE,
            }
        })
    }

    async createChannelInviteNotification(sender:string, receiver:string, channel:string)
    {
        await this.prismaService.notification.create({
            data:{
                userId:receiver,
                senderId:sender,
                type:NotificationType.CHANNELINVITE,
                channelId:channel
            }
        })
    }

    async createDirectMessageNotification(sender:string, receiver:string)
    {
        await this.prismaService.notification.create({
            data:{
                userId:receiver,
                senderId:sender,
                type:NotificationType.DMESSAGE
            }
        })
    }

    async createChannelMessageNotification(sender:string, channel:string)
    {
        const channelMembers = await this.chatService.getChannelMembersIds(channel, sender);
        for (const member of channelMembers)
        {
            await this.prismaService.notification.create({
                data:{
                    userId:member.userId,
                    senderId:sender,
                    type:NotificationType.CMESSAGE,
                    channelId:channel
                }
            })
        }
    }

    async getUserNotification(user:string)
    {
        return await this.prismaService.notification.findMany({
            where:{
                userId:user,
                OR:[
                    {type:NotificationType.FRIENDINVITE},
                    {type:NotificationType.CHANNELINVITE},
                ],
                read:false
            },
        });
    }

    async readUserNotification(user:string)
    {
        const userNotification:any = await this.getUserNotification(user);
        await this.prismaService.notification.updateMany({
            where:{
                userId:user,
                OR:[
                    {type:NotificationType.FRIENDINVITE},
                    {type:NotificationType.CHANNELINVITE},
                ],
                read:false,
            },
            data:{
                read:true,
            }
        })
    }

    async checkUserNotification(user:string)
    {
        const   notificationType: Set<NotificationType> = new Set();
        let     userNotificationTypes:{invites:boolean, chat:boolean} = {invites:false, chat:false};

        const userNotification = await this.prismaService.notification.findMany({
            where:{
                userId:user,
                read:false,
            },
            select:{
                type:true,
            }
        })

        for (const noti of userNotification)
            notificationType.add(noti.type);

        if (notificationType.has(NotificationType.CHANNELINVITE) || notificationType.has(NotificationType.FRIENDINVITE))
            userNotificationTypes['invites'] = true;
        if (notificationType.has(NotificationType.CMESSAGE) || notificationType.has(NotificationType.DMESSAGE))
            userNotificationTypes['chat'] = true;
        return userNotificationTypes;   
    }

    // check the chat notification channel/directMessage for a specific user
    async chatNotification(user:string)
    {
        let chatNotif:Set<chatNotification> = new Set();
        let allNotification:{DM:string[], CM:string[]} = {DM:[], CM:[]};


        // get the user notification related to channel/direct messages
        const chatUserNotification = await this.prismaService.notification.findMany({
            where:{
                userId:user,
                OR:[
                    {type:NotificationType.CMESSAGE},
                    {type:NotificationType.DMESSAGE},
                ],
                read:false,
            }
        });
        // get unique of them by pushing them into a set.
        for (const chat of chatUserNotification){
            if (chat.type === NotificationType.CMESSAGE)
                chatNotif.add(new chatNotification(chat.channelId, NotificationType.CMESSAGE));
            else
                chatNotif.add(new chatNotification(chat.senderId, NotificationType.DMESSAGE));
        };
        // filter the result.
        for(const value of chatNotif)
        {
            if (value.type === NotificationType.CMESSAGE)
            {
                allNotification['CM'].push(value.id);
            }
            else
                allNotification['DM'].push(value.id);
        }
        return allNotification;
    }

    // read all channel notificaion for a specific user
    async readChannelNotification(user:string, channel:string){
        await this.prismaService.notification.updateMany({
            where:{
                userId:user,
                channelId:channel
            },
            data:{
                read:true,
            }
        })
    }

    // read all direct message notificaion for a specific user
    async readDirectNotification(user:string, sender:string){
        await this.prismaService.notification.updateMany({
            where:{
                userId:user,
                senderId: sender,
                type:NotificationType.DMESSAGE
            },
            data:{
                read:true,
            }
        })
    }

    async readChannelInviteNotification(user: string, channelId: string)
    {
        const notification = await this.prismaService.notification.findFirst({
            where: {
                userId: user,
                channelId: channelId,
                type: NotificationType.CHANNELINVITE,
            }
        });
        await this.prismaService.notification.update({
            where: {
                id:notification.id
            },
            data: {
                read:true,
            }
        })
    }
}
