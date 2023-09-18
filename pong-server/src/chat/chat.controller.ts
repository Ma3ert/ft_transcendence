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
import { updateChannelDto } from './dto/updateChannel.dto';

@Controller('chat')
export class ChatController {
    constructor(private chatService:ChatService) {}

    // create Channel
    @Post('/channels')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(LoggedInGuard)
    async CreateChannel(@Body() createChannelDto:createChannelDto, @Req() req:Request){
        try{
            const userId = req.user['id'] as string;
            if (!userId || userId === undefined)
                return ;

            const channel = await this.chatService.createChannel(userId, createChannelDto);

            return channel;
        } catch(error){
            throw new HttpException({
                error:`${error}`,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            },HttpStatus.FORBIDDEN);
        }
    }

    // // User Join a Channel
    // // now the user will join the channel without any constraints.
    // @Post('/channels/:channelId/join/')
    // @HttpCode(HttpStatus.CREATED)
    // @UseGuards(LoggedInGuard)
    // async joinChannel(@Body() joinchannelDto:joinChannelDto, @Req() req:Request){
    //     try{
    //         const userId = req.user['id'] as string;
    //         if (!userId || userId === undefined)
    //             return ;
    //         await this.chatService.userJoinChannel(joinchannelDto.userId, joinchannelDto.channelId, "MEMBER");
    //     }
    //     catch(error){
    //         throw new HttpException(
    //             "User Cnnot Join the channel",
    //             HttpStatus.INTERNAL_SERVER_ERROR
    //         )
    //     }
    // }

    // // ban user from the channel
    // // the banner the banned user
    // // the banner should have the permission of (admin or owner)
    // // the banned and the banner should belong to the same channel
    // // if the banner have the privilege of admin should not ban owner
    // // the owner ban everyone

    // @Patch('/channels/permission/')
    // @UseGuards(LoggedInGuard)
    // @Roles(Role.OWNER)
    // async changePermission(@Body() changeUserPermission:changeUserPermissionDto, @Req() req:Request){
    //     const user = req.user['id'] as string;
    //     if (!user || user == undefined)
    //         return ;
    //     const changedUser = await this.chatService.changePermission(user, changeUserPermission);
    //     if (!changedUser)
    //     {
    //         throw new HttpException(
    //             'You cannot change the permission of this User',
    //             HttpStatus.FORBIDDEN
    //         );
    //     }

    // }

    // @Delete('/channels/:channelId/unban/:userId')
    // @HttpCode(HttpStatus.NO_CONTENT)
    // @UseGuards(LoggedInGuard)
    // @Roles(Role.ADMIN, Role.OWNER)
    // async unBanUserFromChannel(@Param('channelId') channelId:string, @Param('userId') userId:string, @Req() req:Request){
    //     const user = req.user['id'] as string;
    //     if (!user || user == undefined)
    //         return ;
    //     try
    //     {
    //         await this.chatService.unbanUser(user, userId, channelId);
    //     }
    //     catch(error){
    //         throw new HttpException(
    //             "You don't have the permission to unban that User",
    //             HttpStatus.FORBIDDEN);
    //     }
    // }

    // @Post('/channels/:channelId/ban')
    // @HttpCode(HttpStatus.CREATED)
    // @UseGuards(LoggedInGuard)
    // @Roles(Role.ADMIN, Role.OWNER)
    // async banUserFromChannel(@Param ('channelId') channelId:string, @Body() banDto:banDto, @Req() req:Request){
    //         const userId = req.user['id'] as string;
    //         if (!userId || userId == undefined)
    //             return ;
    //         const ban = await this.chatService.banUser(userId, banDto.banned, channelId);
    //         if (!ban)
    //         {
    //             throw new HttpException(
    //                 "You don't have the permission to ban that User",
    //                 HttpStatus.FORBIDDEN);
    //         }
    // }

    // // delete Channel
    // @Delete('/channels/:channelId')
    // @UseGuards(LoggedInGuard)
    // @Roles(Role.OWNER)
    // async deleteChannel(@Param('channelId') channel:string){
    //     await this.chatService.deleteChannelById(channel);
    // }

    // // get message of a specific Direct Message
    // // it will updated for pagination
    // @Get('/direct/messages/:friendId')
    // @HttpCode(HttpStatus.OK)
    // @UseGuards(LoggedInGuard)
    // async getDirectMessages(@Param('friendId') friendId:string, @Req() req:Request){
    //     try{
    //         const userId = req.user['id'] as string;
    //         if (!userId || userId === undefined)
    //             return;
    //         const messages = await this.chatService.getDMs(friendId, req.user['id']);
    //         return (messages);
    //     }
    //     catch(error){
    //         throw new HttpException(
    //             'Direct Message Error',
    //             HttpStatus.INTERNAL_SERVER_ERROR
    //         )
    //     }
    // }

    // // get channel Messages
    // // it will updated for pagination
    // @Get('/channels/:channelId/messages')
    // @UseGuards(LoggedInGuard)
    // @Roles(Role.ADMIN, Role.MEMBER, Role.OWNER)
    // async getChannelMessages(@Param('channelId') channelId:string, @Req() req:Request){
    //     try{
    //         const userId = req.user['id'] as string;
    //         if (!userId || userId === undefined)
    //             return;
    //         const messages = await this.chatService.getChannelMessages(channelId);
    //         return messages;
    //     }
    //     catch(error){
    //         throw new HttpException(
    //             'Direct Message Error',
    //             HttpStatus.INTERNAL_SERVER_ERROR
    //         )
    //     }
    // }

    // // update channel
    // // @Patch('/channels/update')
    // // @UseGuards(LoggedInGuard)
    // // @Roles(Role.OWNER)
    // // async updateChannelSetting(@Body() updateChannelDto:updateChannelDto){

    // // }
    
    // // leave channel
    // @Delete('/channels/:channelId/leave')
    // @UseGuards(LoggedInGuard)
    // @Roles(Role.ADMIN, Role.MEMBER, Role.OWNER)
    // async leaveChannel(@Param('channelId') channelId:string, @Req() req:Request){
    //     try
    //     {
    //         const userId = req.user['id'] as string;
    //         if (!userId || userId === undefined)
    //             return ;
    //         await this.chatService.leaveChannel(channelId, userId);
    //     }
    //     catch(error)
    //     {
    //         throw new HttpException(
    //             'You are not belonging to this channel',
    //             HttpStatus.NOT_FOUND
    //         )
    //     }
    // }

    // // kick User
    // @Delete('/channels/:channelId/kick/:userid')
    // @UseGuards(LoggedInGuard)
    // @Roles(Role.ADMIN, Role.OWNER)
    // async kickUser(@Param('channelId') channelId:string, @Param('userId') userId:string,@Req() req:Request){
    //     try{
    //         const userId = req.user['id'] as string;
    //         if (!userId || userId === undefined)
    //             return ;
    //         await this.chatService.leaveChannel(channelId, userId);
    //     }
    //     catch (error)
    //     {
    //         throw new HttpException(
    //             'The User you are Trying to kick is not in the channel.',
    //             HttpStatus.NOT_FOUND
    //         )
    //     }
    // }
}
