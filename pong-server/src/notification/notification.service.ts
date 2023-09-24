import { Injectable } from '@nestjs/common';
import { NotificationType } from '@prisma/client';
import { channel } from 'diagnostics_channel';
import { ChatService } from 'src/chat/chat.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
    constructor (private prismaService:PrismaService,
                 private chatService:ChatService){}

    async createNotification(sender:string, receiver:string, type:NotificationType)
    {
        await this.prismaService.notification.create({
            data:{
                senderId:sender,
                receiverId:receiver,
                type:type,
                read:false
            }
        })
    }

    async getChatNotification(user:string)
    {
        const chatNotification = await this.prismaService.notification.findMany({
            where:{
                OR:[
                    {type: NotificationType.CMESSAGE},
                    {type: NotificationType.DMESSAGE},
                ],
                receiverId:user,
                read:false,
            }
        })
        return (chatNotification);
    }

    async getUserNotification(user:string)
    {
        const userNotification = await this.prismaService.notification.findMany({
            where:{
                OR:[
                    {type: NotificationType.FRIENDREQUEST},
                    {type: NotificationType.CHANNELINVITE},
                ],
                receiverId:user,
                read:false,
            }
        })
        return (userNotification);      
    }

    async userCheckNotification(user:string)
    {
        const userNotifTypes = {};
        const uniqueNotificationType = new Set();

        const userNotification = await this.prismaService.notification.findMany({
            where:{
                receiverId:user,
                read:false,
            },
            select:{
                type:true,
            }
        });

        for (const notif of userNotification){
            uniqueNotificationType.add(notif.type);
        }

        if (uniqueNotificationType.has(NotificationType.CMESSAGE)
        || uniqueNotificationType.has(NotificationType.DMESSAGE))
            userNotifTypes['chat'] = true;
        else
            userNotifTypes['chat'] = false;
        if (uniqueNotificationType.has(NotificationType.FRIENDREQUEST)
        || uniqueNotificationType.has(NotificationType.CHANNELINVITE))
            userNotifTypes['request'] = true;
        else
            userNotifTypes['request'] = false;
        return userNotifTypes;
    }

    async checkChatNotification(user:string)
    {
        const chatUserNotification = {};

        const DirectMessages = await this.prismaService.notification.findMany({
            where:{
                receiverId:user,
                read:false,
                type:NotificationType.DMESSAGE
            },
            select:{
                senderId:true,
            }
        });

        chatUserNotification['DM'] = Array.from(DirectMessages);

        const ChannelMessages = await this.prismaService.notification.findMany({
            where:{
                read:false,
                type:NotificationType.CMESSAGE,
            },
            select:{
                receiverId:true,
            }
        });
        
        // const UserCMNotification = this.chatService.UserIsBelongToChannel(user, );
        // return chatUserNotification;
    }


}
