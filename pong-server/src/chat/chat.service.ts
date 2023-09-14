import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createChannelDto } from './dto/channel.create.dto';
import { channel } from 'diagnostics_channel';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

// TODO
// * create channel Nadi
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
        await this.addUserToChannel(channel.id, createChannelDto.ownerId, "OWNER");
        return channel;
    }

    // User To Channel
    async addUserToChannel(channelId:string, userId:string, role:Role){
        const user = await this.prismaService.channelUser.create({
            data:{
                userId:userId,
                channelId:channelId,
                role:role,
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
}
