import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoggedInGuard } from 'src/auth/utils/LoggedIn.guard';
import { createChannelDto } from './dto/channel.create.dto';
import { ChatService } from './chat.service';
import { Request, Response } from 'express';
import { joinChannelDto } from './dto/joinChannel.dto';
import { Role } from '@prisma/client';
import { Roles } from './decorator/role.decorator';
import { RoleGuard } from './role.guard';
import { banDto } from './dto/ban.dto';
import { changeUserPermissionDto } from './dto/changeUserPermission.dto';

@Controller('chat')
export class ChatController {
    constructor(private chatService:ChatService) {}

    // create Channel
    @Post('/channels')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(LoggedInGuard)
    async CreateChannel(@Body() createChannelDto:createChannelDto, @Req() req:Request){
        try{
            const channel = await this.chatService.createChannel(createChannelDto);
            return channel;
        } catch(error){
            console.log(error);
            throw new HttpException(
                'channel Creation error',
                HttpStatus.INTERNAL_SERVER_ERROR,
                )
        }
    }

    // User Join a Channel
    // now the user will join the channel without any constraints.
    @Post('/channels/join/')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(LoggedInGuard)
    async joinChannel(@Body() joinchannelDto:joinChannelDto, @Req() req:Request){
        try{
            const userId = req.user['id'] as string;
            if (!userId || userId === undefined)
                return ;
            await this.chatService.userJoinChannel(joinchannelDto.userId, joinchannelDto.channelId, "MEMBER");
        }
        catch(error){
            throw new HttpException(
                "User Cnnot Join the channel",
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    // ban user from the channel
    // the banner the banned user
    // the banner should have the permission of (admin or owner)
    // the banned and the banner should belong to the same channel
    // if the banner have the privilege of admin should not ban owner
    // the owner ban everyone

    @Patch('/channels/permission/')
    @UseGuards(LoggedInGuard)
    @Roles(Role.OWNER)
    async changePermission(@Body() changeUserPermission:changeUserPermissionDto, @Req() req:Request){
        const user = req.user['id'] as string;
        if (!user || user == undefined)
            return ;
        const changedUser = await this.chatService.changePermission(user, changeUserPermission);
        if (!changedUser)
        {
            throw new HttpException(
                'You cannot change the permission of this User',
                HttpStatus.FORBIDDEN
            );
        }

    }

    @Delete('/channels/unban/:userId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(LoggedInGuard)
    @Roles(Role.ADMIN, Role.OWNER)
    async unBanUserFromChannel(@Param('userId') userId:string, @Req() req:Request){
        const user = req.user['id'] as string;
        if (!user || user == undefined)
            return ;
    }

    @Post('/channels/ban')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(LoggedInGuard)
    @Roles(Role.ADMIN, Role.OWNER)
    async banUserFromChannel(@Body() banDto:banDto, @Req() req:Request){
            const userId = req.user['id'] as string;
            if (!userId || userId == undefined)
                return ;
            const ban = await this.chatService.banUser(userId, banDto.banned, banDto.channel);
            if (!ban)
            {
                throw new HttpException(
                    "You don't have the permission to ban that User",
                    HttpStatus.FORBIDDEN);
            }
    }

    // delete Channel
    @Delete('/channels/:channelId')
    @UseGuards(LoggedInGuard)
    @Roles(Role.OWNER)
    async deleteChannel(@Param('channelId') channel:string){
        await this.chatService.deleteChannelById(channel);
    }

    // get message of a specific Direct Message
    @Get('/direct/messages/:friendId')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LoggedInGuard)
    async getDirectMessages(@Param('friendId') friendId:string, @Req() req:Request){
        try{
            const userId = req.user['id'] as string;
            if (!userId || userId === undefined)
                return;
            const messages = await this.chatService.getDMs(friendId, req.user['id']);
            return (messages);
        }
        catch(error){
            throw new HttpException(
                'Direct Message Error',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }

    // get channel Messages
    @Get('/channels/messages/:channelId')
    @UseGuards(LoggedInGuard)
    @Roles(Role.ADMIN, Role.MEMBER, Role.OWNER)
    async getChannelMessages(@Param('channelId') channelId:string, @Req() req:Request){
        try{
            const userId = req.user['id'] as string;
            if (!userId || userId === undefined)
                return;
            const messages = await this.chatService.getChannelMessages(channelId);
            return messages;
        }
        catch(error){
            throw new HttpException(
                'Direct Message Error',
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
    }
}
