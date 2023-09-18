import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createChannelDto } from './dto/channel.create.dto';
import * as bcrypt from 'bcrypt';
import { Role, Type } from '@prisma/client';
import { joinChannelDto } from './dto/joinChannel.dto';
import { changeUserPermissionDto } from './dto/changeUserPermission.dto';

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
    async userJoinChannel(user:string, channel:string, role:Role){
        const isJoined = await this.prismaService.channelUser.findFirst({
            where:{
                userId:user,
                channelId:channel
            },
        })

        if (isJoined)
            return isJoined;

        const joinedUser = await this.prismaService.channelUser.create({
            data:{
                userId:user,
                channelId:channel,
                role:role
            }
        })
        return joinedUser;
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

    // get all messages of direct message in descending order still need to configure the pagination
    // for getting messages.
    async getDMs(user1:string, user2:string){
        const messages = await this.prismaService.directMessage.findMany({
            where:{
                OR:[
                    {
                        senderId:user1,
                        receiverId:user2,},
                    {
                        senderId:user2,
                        receiverId:user1,
                    }
                ]
            },
            orderBy:{
                create_at:'desc'
            }
        })
        return messages;
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

    async getChannelMessages(channel:string){
        return await this.prismaService.channelMessage.findMany({
            where:{
                channelId:channel,
            },
            orderBy:{
                create_at:'desc',
            }
        })
    }

    // Delete Channel
    async deleteChannelById(channel:string){
        const deletedChannel = await this.prismaService.channel.delete({
            where:{
                id:channel,
            }
        })
    }

    // get Members of Channel
    async getChannelMembers(channel:string){
        return await this.prismaService.channelUser.findMany({
            where:{
                channelId:channel,
            },
            select:{
                userId:true,
            }
        })
    }

    async leaveChannel(channel:string, user:string){
        await this.prismaService.channelUser.delete({
            where:{
                userId_channelId:{
                    userId:user,
                    channelId:channel,
                }
            }
        })
    }


}
