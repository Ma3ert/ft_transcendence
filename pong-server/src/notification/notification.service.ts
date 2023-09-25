import { Injectable } from '@nestjs/common';
import { NotificationType } from '@prisma/client';
import { channel } from 'diagnostics_channel';
import { ChatService } from 'src/chat/chat.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
    constructor (
        private prismaService:PrismaService,
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
        const channelMembers = await this.chatService.getChannelMembers(channel, sender);
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
            select:{
                id:false,
                created_at:false
            }
        });
    }

    async readUserNotification(user:string)
    {
        const userNotification = await this.getUserNotification(user);
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
}
