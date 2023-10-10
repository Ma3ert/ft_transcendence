import { ForbiddenException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { createChannelDto } from './dto/channel.create.dto';
import * as bcrypt from 'bcrypt';
import { Channel, ChannelInvite, NotificationType, Role, Type } from '@prisma/client';
import { type } from 'os';
import { changeChannelPasswordDto, setPasswordDto } from './dto/channelPassword.dto';
import { UsersService } from '../users/users.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class ChatService {
    constructor(private prismaService: PrismaService,
        private usersService: UsersService,
        @Inject(forwardRef(() => NotificationService))
        private notificationService: NotificationService
    ) { }
    
    // Create Channel
    async createChannel(owner:string, createChannelDto:createChannelDto){
        let hashedPassword = null;

        if (!createChannelDto.password && createChannelDto.type == Type.PROTECTED)
            throw new InternalServerErrorException('Password not set for protected channel');
        
        if (createChannelDto.type === "PROTECTED"){
            hashedPassword = await bcrypt.hash(createChannelDto.password.toString(), 10);
        }

        const channel = await this.prismaService.channel.create({
            data:{
                name:createChannelDto.name,
                type:createChannelDto.type,
                password:hashedPassword,
                avatar:createChannelDto.avatar,
                members:{
                    create:[
                        {userId:owner, role:Role.OWNER},
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
    }

    async userhasInvitation(user:string, channel:string){
        return await this.prismaService.channelInvite.findFirst({
            where:{
                channelId:channel,
                receiverId:user
            }
        })
    }


    async userJoinChannel(user:string, channel:string, password:string){
        const userExist = await this.prismaService.channelUser.findUnique({
            where:{
                userId_channelId:
                {
                    userId:user,
                    channelId:channel,
                }
            }
        })

        if (userExist)
            throw new ForbiddenException("The User Already Joined the Channel.");

        const userInvite = !!await this.userhasInvitation(user, channel);

        if (!userInvite)
            throw new InternalServerErrorException("User dosen't have invitation to this channel");

        const Channel = await this.prismaService.channel.findFirst({
            where:{
                id:channel,
            }
        })

        if (Channel.type === Type.PROTECTED && !password)
            throw new InternalServerErrorException('The channel required password');

        if (password)
        {
            const isMatch = await bcrypt.compare(password, Channel.password);
            if (!isMatch)
                throw new InternalServerErrorException('Invalid Password');
        }

        await this.prismaService.channelUser.create({
            data:{
                userId:user,
                channelId:channel,
                role:Role.MEMBER,
            }
        })
    }

    async createDirectMessage(sender: string, receiver: string, message: string) {
        const isBlocked = await this.usersService.checkBlocked(sender, receiver);
        const isBlockedBy = await this.usersService.checkBlocked(receiver, sender);

        if (isBlocked || isBlockedBy)
            return ;
        await this.prismaService.directMessage.create({
            data:{
                senderId:sender,
                receiverId:receiver,
                content:message,
            }
        })
    }

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

    async deleteChannelById(user:string, channel:string){
        const deletedChannel = await this.prismaService.channel.delete({
            where:{
                id:channel,
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

    async getChannelMembersIds(channel:string, userId:string){
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

    async channelMembers(channel: string, user: string) {
        let members = [];

        const channelMem = await this.getChannelMembersIds(channel, user);
        const ChannelBan = await this.getBannedUsers(channel);
        const channelMute = await this.MutedMembers(channel);
        for (const usr of channelMem)
        {
            let member = {};
            member['user'] = usr.userId;
            member['role'] = usr.role;
            member['banned'] = ChannelBan.some((obj) => obj.userId === usr.userId);
            member['muted'] = channelMute.some((obj) => obj.userId === usr.userId);
            members.push(member);
        }
        return members;
    }

    async MutedMembers(channel: string)
    {
        return await this.prismaService.channelMute.findMany({
            where: {
                channelId: channel,
            }
        });
    }

    async upgradeUser(owner:string, upgradeuser:string, channel:string){
        const user = await this.prismaService.channelUser.findFirst({
            where:{
                userId:upgradeuser,
                channelId:channel
            }});
        if (!user)
            throw new ForbiddenException('user is not belong to the same channel as the owner.');

        if (user.role != Role.MEMBER)
            throw new ForbiddenException("you can't upgrade an owner or admin user");

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
            throw new ForbiddenException('The User is not belong to the same channel as the owner.');
        if (user.role != Role.ADMIN)
            throw new ForbiddenException("You can't downgrade an owner or member user");
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
        const bannedUser = await this.prismaService.channelUser.findUnique({
            where:{
                userId_channelId:{
                    userId:banned,
                    channelId:channel,
                }
            }
        })
        if (!bannedUser)
            throw new ForbiddenException("The user to banned is not in the Channel.");

        if (bannedUser.role == Role.OWNER)
            throw new ForbiddenException('You cannot ban The Owner of The Channel');

        const UserBanned = await this.prismaService.channelBan.findUnique({
            where:{
                userId_channelId:
                {
                    userId:banned,
                    channelId:channel
                }
            }
        });

        if (UserBanned)
            throw new ForbiddenException('The User is already banned');


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
        const user = await this.prismaService.channelUser.findUnique({
            where:{
                userId_channelId:{
                    userId:banned,
                    channelId:channel}
                }
            });

        if (!user)
            throw new  ForbiddenException("The User is not belong to the same channel.");

        const isbanned = await this.prismaService.channelBan.findFirst({where:{userId:banned, channelId:channel}});

        if (!isbanned)
            throw new ForbiddenException('The User to unban is not banned.');

        await this.prismaService.channelBan.delete({
            where:{
                userId_channelId:{
                    userId:banned,
                    channelId:channel,
                }
            }
        })
    }

    async muteUser(muted:string, channel:string)
    {
        const mutedId = await this.prismaService.channelUser.findFirst({
            where:{
                userId:muted,
                channelId:channel,
            }
        });

        if (!mutedId || mutedId.role == Role.OWNER)
            throw new ForbiddenException('You cannot Mute this user');

        const isMuted = await this.prismaService.channelMute.findUnique({
            where:{
                userId_channelId:{
                    userId:muted,
                    channelId:channel
                }
            }
        })

        if (isMuted)
            throw new ForbiddenException("User is already muted");
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

    async createChannelInvite(sender:string, receiver:string, channelId:string)
    {
        const senderUser = await this.prismaService.channelUser.findUnique({
            where:{
                userId_channelId:{
                    userId:sender,
                    channelId:channelId,
                }
            }
        });

        const channel = await this.prismaService.channel.findFirst({
            where:{
                id:channelId,
            }
        })

        if (senderUser.role === Role.MEMBER && (channel.type == Type.PRIVATE || channel.type == Type.PROTECTED))
            throw new ForbiddenException("The User doesn't have the permission to invite a user to this type of channel.");

        const UserExist = await this.prismaService.user.findFirst({
            where:{
                id:receiver,
            }
        })

        if (!UserExist)
            throw new ForbiddenException("The invited User  doesn't exist.");

        const UserInviteExist = await this.prismaService.channelInvite.findFirst({where:{receiverId:receiver, channelId:channelId}});

        if (UserInviteExist)
            throw new InternalServerErrorException("The Invite is already sent to the user.");

        const userInChannel = await this.prismaService.channelUser.findUnique({
            where:{
                userId_channelId:{
                    userId:receiver,
                    channelId:channelId,
                }
            }
        })

        if (userInChannel)
            throw new ForbiddenException("The User already joined the Channel.");

        await this.prismaService.channelInvite.create({
            data:{
                senderId:sender,
                receiverId:receiver,
                channelId:channelId,
            }
        })
        await this.notificationService.createChannelInviteNotification(sender, receiver, channelId);
    }

    async deleteChannelInvite(user:string, channel:string)
    {
        const found = await this.prismaService.channelInvite.deleteMany({
            where:{
                receiverId:user,
                channelId:channel
            },
        })
        await this.notificationService.readChannelInviteNotification(user, channel);
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

    async changeChannelPassword(channel:string, changeChannelPassword:changeChannelPasswordDto)
    {
        const Channel = await this.prismaService.channel.findFirst({
            where:{
                id:channel,
            }
        });

        if (Channel.type != Type.PROTECTED)
            throw new ForbiddenException("Channel is not Protected By a password");

        const isMatch = await bcrypt.compare(changeChannelPassword.currentPassword, Channel.password);
        if (!isMatch)
            throw new ForbiddenException("wrong password.");
        const newPasswordHashed = await bcrypt.hash(changeChannelPassword.newPassword, 10);
        await this.prismaService.channel.update({
            where:{
                id:channel,
            },
            data:{
                password:newPasswordHashed,
            }
        });
    }

    async removeChannelPassword(channel:string){
        await this.prismaService.channel.update({
            where:{
                id:channel,
            },
            data:{
                type:Type.PUBLIC,
                password:null,
            }
        })
    }

    async setChannelPassword(channel:string, password:string){
        const hash = await bcrypt.hash(password, 10);
        await this.prismaService.channel.update({
            where:{
                id:channel
            },
            data:{
                type:Type.PROTECTED,
                password:hash,
            }
        })
    }

    async changeChannelName(channel:string, newName:string)
    {
        await this.prismaService.channel.update({
            where:{
                id:channel
            },
            data:{
                name:newName,
            }
        })
    }

    async getUserRoleInCahannel(channel:string, user:string)
    {
        return await this.prismaService.channelUser.findUnique({
            where:{
                userId_channelId:{
                    userId:user,
                    channelId:channel,
                }
            },
            select:{
                userId:true,
                role:true,
            }
        })
    }

    async getChannelById(channel:string)
    {
        const Channelmembers = await this.prismaService.channel.findUnique({
            where:{
                id:channel,
            },
            include:{
                members:true,
            }
        });
    
        const chan = await this.prismaService.channel.findUnique({
            where:{
                id:channel,
            },
            select: {
                id:true,
                name:true,
                type:true,
                avatar:true,
            }
        });
        chan['members'] = Channelmembers.members.length;
        return chan;
    }

    async getAllUserChannels(user: string)
    {
        const userChannels = await this.prismaService.channelUser.findMany({
            where: {
                userId: user,
            },
            select:
            {
                channelId: true,
            }
        });
        let channels:Channel[] = [];
        for (const channel of userChannels) {
            const chan = await this.prismaService.channel.findUnique({
                where: {
                    id: channel.channelId,
                }
            });
            channels.push(chan);
        }
        return channels;
    }

    async getChannelInvitesSent(user: string)
    {
        let invites = [];
        let userInvites = await this.prismaService.channelInvite.findMany({
            where: {
                senderId: user,
            },

        });
        for (let invite of userInvites)
        {
            let channel = await this.getChannelById(invite.channelId);
            invites.push({
                sender: invite.senderId,
                reciever: invite.receiverId,
                channel:channel
            });
        }
        return invites;
    }

    async getChannelInvitesRecieved(user: string) {
        let invites = []
        let userInvites = await this.prismaService.channelInvite.findMany({
            where: {
                receiverId: user,
            },
        });
        for (let invite of userInvites)
        {
            let channel = await this.getChannelById(invite.channelId);
            invites.push({
                sender: invite.senderId,
                reciever: invite.receiverId,
                channel: channel
            });
        }
        return invites;
    }

    async updateChannelAvatar(channel: string, _avatar: string) {
        await this.prismaService.channel.update({
            where: {
                id:channel,
            },
            data: {
                avatar:_avatar,
            }
        })
    }

    async changeVisiblity(channel: string, _type:Type)
    {
        await this.prismaService.channel.update({
            where: {
                id:channel,
            },
            data: {
                type:_type
            }
        })
    }
}