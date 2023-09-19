import { ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createChannelDto } from './dto/channel.create.dto';
import * as bcrypt from 'bcrypt';
import { Role, Type } from '@prisma/client';
import { ChangePermissionDto } from './dto/changePermission.dto';

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

    async getChannelMembers(channelId:string, userId:string){
        return await this.prismaService.channelUser.findMany({
            select:{
                userId:true,
                role:true,
            }
        })
    }

    async changePermission(owner:string, UserPermission:ChangePermissionDto, channel:string){
        const user = await this.prismaService.channelUser.findFirstOrThrow({
            where:{
                userId:UserPermission.user,
                channelId:channel
            }
        })
        if (user.role == Role.OWNER || UserPermission.role == Role.OWNER)
            throw new InternalServerErrorException('You cannot Change the owner permission');
        await this.prismaService.channelUser.update({
            where:{
                userId_channelId:{
                    userId:UserPermission.user,
                    channelId:channel,
                }
            },
            data:{
                role:UserPermission.role,
            }
        })
    }
}
