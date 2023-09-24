import { ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createChannelDto } from './dto/channel.create.dto';
import * as bcrypt from 'bcrypt';
import { NotificationType, Role, Type } from '@prisma/client';
import { type } from 'os';

@Injectable()
export class ChatService {
    constructor(private prismaService:PrismaService){}
    
    // Create Channel
    async createChannel(owner:string, createChannelDto:createChannelDto){
        let hashedPassword = null;

        if (!createChannelDto.password && createChannelDto.type == Type.PROTECTED)
            throw new InternalServerErrorException('password not set for protected channel');
        
        if (createChannelDto.type === "PROTECTED"){
            hashedPassword = await bcrypt.hash(createChannelDto.password.toString(), 10);
        }

        const ownerId = await this.prismaService.user.findFirstOrThrow({
            where:{
                id:owner,
            },
            select:{
                id:true,
            }
        })

        const channel = await this.prismaService.channel.create({
            data:{
                name:createChannelDto.name,
                type:createChannelDto.type,
                password:hashedPassword,
                avatar:createChannelDto.avatar,
                members:{
                    create:[
                        {userId:ownerId.id, role:Role.OWNER},
                    ]
                }
            },
            select:{
                name:true,
                type:true,
                avatar:true,
                id:true,
            }
        })

        return channel;
    }

    // User join the Channel
    // if it is public or private or protected
    async userJoinChannel(userId:string, channel:string, password:string){
        const user = await this.prismaService.user.findFirstOrThrow({
            where:{
                id:userId,
            }
        });

        const Channel = await this.prismaService.channel.findFirst({
            where:{
                id:channel,
            }
        })

        if (Channel.type === Type.PROTECTED && !password)
            throw new InternalServerErrorException('the channel required password');

        if (password)
        {
            const isMatch = await bcrypt.compare(password, Channel.password);
            if (!isMatch)
                throw new InternalServerErrorException('Invalid Password');
        }

        await this.prismaService.channelUser.create({
            data:{
                userId:userId,
                channelId:channel,
                role:Role.MEMBER,
            }
        })
    }

    // Create DM
    async createDirectMessage(sender:string, receiver:string, message:string){
        await this.prismaService.directMessage.create({
            data:{
                senderId:sender,
                receiverId:receiver,
                content:message,
            }
        })
    }

    // Create ChannelMessage
    async createChannelMessage(sender:string, channel:string, message:string){
        await this.prismaService.channelMessage.create({
            data:{
                userId:sender,
                channelId:channel,
                content:message,
            }
        })
    }

    async getDMs(user:string, friend:string, skip:number, take:number){
        return await this.prismaService.directMessage.findMany({
            where:{
                OR:[
                    {
                        senderId:user,
                        receiverId:friend,},
                    {
                        senderId:friend,
                        receiverId:user,
                    }
                ]
            },
            orderBy:{
                create_at:'desc'
            },
            skip:skip,
            take:take,
        })
    }

    CreateRoomId(senderId:string, receiverId:string){
        const users = [];
        users.push(senderId);
        users.push(receiverId);
        users.sort();
        return (users[0] + users[1]);
    }

    async isBanned(user:string, channel:string){
        const isBanned = this.prismaService.channelBan.findFirst({
            where:{
                userId:user,
                channelId:channel,
            }
        })
        if (isBanned)
            return true;
        return false;
    }

    async getAllchannelMembers(channel:string){
        return await this.prismaService.channelUser.findMany({
            where:{
                channelId:channel,
            },
            select:{
                userId:true,
            }
        });
    }             

    // get channel message
    async getChannelMessages(skip:number, take:number, channel:string){
        return await this.prismaService.channelMessage.findMany({
            where:{
                channelId:channel,
            },
            orderBy:{
                create_at:'desc',
            },
            skip:skip,
            take:take
        })
    }

    // Delete Channel
    async deleteChannelById(user:string, channel:string){
        const owner = await this.prismaService.channelUser.findUniqueOrThrow({
            where:{
                userId_channelId:{
                    userId:user,
                    channelId:channel,
                }
            }
        })
        if (owner.role != Role.OWNER)
            throw new ForbiddenException('You are not the owner of the channel');
        const deletedChannel = await this.prismaService.channel.delete({
            where:{
                id:channel,
            }
        })
    }

    // leave channel
    async leaveChannel(channel:string, user:string){
        const isInChannel = !!await this.prismaService.channelUser.findFirstOrThrow({
            where:{
                userId:user,
                channelId:channel
            }
        })

        await this.prismaService.channelUser.delete({
            where:{
                userId_channelId:{
                    userId:user,
                    channelId:channel,
                }
            }
        })
    }

    // get Channel Members
    async getChannelMembers(channel:string, userId:string){
        return await this.prismaService.channelUser.findMany({
            where:{
                channelId:channel,
            },
            select:{
                userId:true,
                role:true,
            }
        })
    }

    async upgradeUser(owner:string, upgradeuser:string, channel:string){
        const user = await this.prismaService.channelUser.findFirst({
            where:{
                userId:upgradeuser,
                channelId:channel
            }});
        if (!user)
            throw new InternalServerErrorException('user is not belong to the same channel as the owner.');
        if (user.role != Role.MEMBER)
            throw new InternalServerErrorException("you can't upgrade an owner or admin user");
        await this.prismaService.channelUser.update({
            where:{
                userId_channelId:{
                    userId:upgradeuser,
                    channelId:channel
                }
            },
            data:{
                role:Role.ADMIN,
            }
        })
    }

    async downgradeUser(owner:string, downgradeuser:string, channel:string){
        const user = await this.prismaService.channelUser.findFirst({
            where:{
                userId:downgradeuser,
                channelId:channel
            }});
        if (!user)
            throw new InternalServerErrorException('user is not belong to the same channel as the owner.');
        if (user.role != Role.ADMIN)
            throw new InternalServerErrorException("you can't downgrade an owner or member user");
        await this.prismaService.channelUser.update({
            where:{
                userId_channelId:{
                    userId:downgradeuser,
                    channelId:channel
                }
            },
            data:{
                role:Role.MEMBER,
            }
        })
    }

    async banUser(banner:string, banned:string, channel:string)
    {
        const user = await this.prismaService.channelUser.findUniqueOrThrow({where:{userId_channelId:{userId:banned, channelId:channel}}});
        const UserBanned = !! await this.prismaService.channelBan.findFirst({where:{userId:banned,channelId:channel,}});
        if (UserBanned)
            throw new InternalServerErrorException('The User is already banned');

        if (user.role == Role.OWNER)
            throw new InternalServerErrorException('You cannot ban The Owner of The Channel');

        await this.prismaService.channelBan.create({
            data:{
                userId:banned,
                channelId:channel,
            }
        });
    }

    async getBannedUsers(channel:string)
    {
        return await this.prismaService.channelBan.findMany({
            where:{
                channelId:channel,
            }
        })
    }

    async unbanUser(unbanner:string, banned:string, channel:string)
    {
        const user = await this.prismaService.channelUser.findFirst({where:{userId:banned, channelId:channel}});
        if (!user)
            throw new  InternalServerErrorException("The User is not belong to the same channel.");

        const isbanned = !!await this.prismaService.channelBan.findFirst({where:{userId:banned, channelId:channel}});
        if (!isbanned)
            throw new InternalServerErrorException('The User to unban is not banned.');

        if (user.role == Role.OWNER)
            throw new InternalServerErrorException('You cannot unban The Owner of The Channel');

        await this.prismaService.channelBan.delete({
            where:{
                userId_channelId:{
                    userId:banned,
                    channelId:channel,
                }
            }
        })
    }

    async muteUser(muter:string, muted:string, channel:string)
    {
        const mutedId = await this.prismaService.channelUser.findFirst({
            where:{
                userId:muted,
                channelId:channel,
            }
        });

        if (!mutedId || mutedId.role == Role.OWNER)
            throw new InternalServerErrorException('You cannot Mute this user');

        await this.prismaService.channelMute.create({
            data:{
                userId:muted,
                channelId:channel,   
            }
        })

        setTimeout(async () => {
            await this.prismaService.channelMute.delete({
                where:{
                    userId_channelId:{
                        userId:muted,
                        channelId:channel,
                    }
                }
            })
        }, 50000);
    }

    async createChannelInvite(sender:string, receiver:string, channel:string)
    {
        const UserExist = await this.prismaService.user.findFirst({
            where:{
                id:receiver,
            }
        })
        if (!UserExist)
            throw new InternalServerErrorException("The User invited doesn't exist.");
        const User = await this.prismaService.channelInvite.findFirst({where:{receiverId:receiver, channelId:channel}});

        if (User)
            throw new InternalServerErrorException("The Invite is already sent to the user.");

        await this.prismaService.channelInvite.create({
            data:{
                senderId:sender,
                receiverId:receiver,
                channelId:channel,
            }
        })
    }

    async deleteChannelInvite(sender:string, receiver:string, channel:string)
    {
        const found = await this.prismaService.channelInvite.findFirst({
            where:{
                senderId:sender,
                receiverId:receiver,
                channelId:channel
            },
            select:{
                id:true,
            }
        })
        if (!found)
            return ;
        await this.prismaService.channelInvite.delete({
            where:{
                id:found.id,
            }
        })
    }

    async getChannelInvite(channel:string, user:string)
    {
        return await this.prismaService.channelInvite.findMany({
            where:{
                channelId:channel,
                receiverId:user,
            },
            select:{
                channelId:true,
                senderId:true,
                receiverId:true,
            }
        })
    }

    async getUserChannels(user:string)
    {
        return await this.prismaService.channelUser.findMany({
            where:{
                userId:user,
            },
            select:{
                channelId:true,
                role:true,
            }
        })
    }

    async getUserConversations(user:string)
    {
        const UserConversations = await this.prismaService.directMessage.findMany({
            where:{
                OR:[
                    {senderId:user},
                    {receiverId:user},
                ]
            },
            select:{
                senderId:true,
                receiverId:true,
            }
        });

        const conversationsUsers = UserConversations.flatMap((conversation) => {
            const users = [];
            if (conversation.senderId !== user)
                users.push(conversation.senderId);
            if (conversation.receiverId !== user)
                users.push(conversation.receiverId);
            return users;
        });

        return Array.from(new Set(conversationsUsers));
    }

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
}
