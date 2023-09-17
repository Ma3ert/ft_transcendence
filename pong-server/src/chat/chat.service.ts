import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createChannelDto } from './dto/channel.create.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { joinChannelDto } from './dto/joinChannel.dto';

// TODO
// * create channel Good
// * join user to channel 
// * send DM
// * send message to channel
// * ban user from channel
// * unban user from channel
// * kick(delete) user from channel
// * mute user
// * change user role
// * update channel (passwordName)
// * invite user to channel


@Injectable()
export class ChatService {
    constructor(private prismaService:PrismaService){}
    
    // Create Channel
    async createChannel(createChannelDto:createChannelDto){
        let hashedPassword = null;
        
        if (createChannelDto.type === "PROTECTED"){
            hashedPassword = await bcrypt.hash(createChannelDto.password.toString(), 10);
        }

        const channel = await this.prismaService.channel.create({
            data:{
                name:createChannelDto.name,
                type:createChannelDto.type,
                password:hashedPassword,
                avatar:createChannelDto.avatar
            },
            select:{
                name:true,
                type:true,
                avatar:true,
                id:true,
            }
        })
        await this.userJoinChannel({userId:channel.id,
                                    channelId:createChannelDto.ownerId,
                                    role:"OWNER"});
        return channel;
    }

    // User To Channel
    async userJoinChannel(joinChannelDto:joinChannelDto){
        const user = await this.prismaService.channelUser.create({
            data:{
                userId:joinChannelDto.userId,
                channelId:joinChannelDto.channelId,
                role:joinChannelDto.role
            }
        })
        return user;
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
}
