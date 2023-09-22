import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { LoggedInGuard } from 'src/auth/utils/LoggedIn.guard';
import { createChannelDto } from './dto/channel.create.dto';
import { ChatService } from './chat.service';
import { joinChannelDto } from './dto/joinChannel.dto';
import { Role } from '@prisma/client';
import { Roles } from './decorator/role.decorator';
import { Request } from 'express';
import { ChangePermissionDto } from './dto/changePermission.dto';


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
            const channel = await this.chatService.createChannel(userId, createChannelDto);

            return channel;
        } catch(error){
            throw new HttpException({
                error:`${error}`,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            },HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // delete Channel
    @Delete('/channels/:channelId')
    @UseGuards(LoggedInGuard)
    @Roles(Role.OWNER)
    async deleteChannel(@Param('channelId') channel:string, @Req() req:Request){
        try
        {
            const userId = req.user['id'] as string;
            await this.chatService.deleteChannelById(userId, channel);
        }
        catch(error)
        {
            throw new HttpException({
                error:"You cannot delete This Channel",
                status: HttpStatus.FORBIDDEN
            }, HttpStatus.FORBIDDEN);
        }
    }

    // User Join a Channel
    // ****** still there is some improvment to in this route
    @Post('/channels/:channelId/join/')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(LoggedInGuard)
    async joinChannel(@Param('channelId') channelId:string, @Body() joinchannelDto:joinChannelDto, @Req() req:Request){
        try{
            const userId = req.user['id'] as string;
            await this.chatService.userJoinChannel(userId, channelId, joinchannelDto.password);
        }
        catch(error){
            throw new HttpException({
                error: `You cannot Join this Channel`,
                status: HttpStatus.INTERNAL_SERVER_ERROR,
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    // leave channel
    @Delete('/channels/:channelId/leave')
    @UseGuards(LoggedInGuard)
    @Roles(Role.ADMIN, Role.MEMBER, Role.OWNER)
    async leaveChannel(@Param('channelId') channelId:string, @Req() req:Request){
        try
        {
            const userId = req.user['id'] as string;
            await this.chatService.leaveChannel(channelId, userId);
        }
        catch(error)
        {
            throw new HttpException(
                'You are not belonging to this channel',
                HttpStatus.NOT_FOUND
            )
        }
    }

    // get channel Members
    @Get('/channels/:channelId/members/')
    @UseGuards(LoggedInGuard)
    @Roles(Role.ADMIN, Role.MEMBER, Role.OWNER)
    async channelMembers(@Param('channelId') channelId:string, @Req() req:Request){
        try{
            const userId = req.user['id'] as string;
            return await this.chatService.getChannelMembers(channelId, userId);
        }
        catch(error)
        {
            throw new HttpException(
                "You don't have the previliege to get cahnnel members",
                HttpStatus.FORBIDDEN)
        }
    }

    //Change permission
    @Patch('/channels/:channelId/permissions/')
    @UseGuards(LoggedInGuard)
    @Roles(Role.OWNER, Role.ADMIN)
    async changePermission(@Param('channelId') channelId:string, @Body() UserPermission:ChangePermissionDto, @Req() req:Request){
        try{
            const user = req.user['id'] as string;
            await this.chatService.changePermission(user, UserPermission, channelId);
        }
        catch (error)
        {
            throw new HttpException(
                "You cannot change permission of that User",
                HttpStatus.FORBIDDEN)
        }
    }

    // get channel messages
    // return total length
    @Get('/channels/:channelId/messages/')
    @UseGuards(LoggedInGuard)
    @Roles(Role.ADMIN, Role.MEMBER, Role.OWNER)
    async getChannelmessage(
        @Query('skip', ParseIntPipe) skip:number,
        @Query('take', ParseIntPipe) take:number,
        @Param('channelId') channelId:string,
        @Req() req:Request){
            try
            {
                const userId = req.user['id'] as string;
                return this.chatService.getChannelMessages(skip, take, channelId);
            }
            catch(error)
            {
                throw new HttpException(
                    "You can't get channel messages.",
                HttpStatus.INTERNAL_SERVER_ERROR)
            }
    }

    // get direct message of a conversation
    @Get('/direct/:friendId/messages/')
    @UseGuards(LoggedInGuard)
    async getDirectMessage(
        @Query('skip', ParseIntPipe) skip:number,
        @Query('take', ParseIntPipe) take:number,
        @Param('friendId') friend:string,
        @Req() req:Request){
            try
            {
                const userId = req.user['id'] as string;
                return this.chatService.getDMs(userId,friend, skip, take);
            }
            catch(error)
            {
                throw new HttpException(
                    "You can't get the Direct messages of this conversation",
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            }
    }

    @Delete('/channels/:channelId/unban/:userId')
    @HttpCode(HttpStatus.NO_CONTENT)
    @UseGuards(LoggedInGuard)
    @Roles(Role.ADMIN, Role.OWNER)
    async unBanUserFromChannel(@Param('channelId') channelId:string, @Param('userId') userId:string, @Req() req:Request){
        try
        {
            const user = req.user['id'] as string;
            await this.chatService.unbanUser(user, userId, channelId);
        }
        catch(error){
            throw new HttpException(
                "You don't have the permission to unban that User",
                HttpStatus.FORBIDDEN);
        }
    }

    @Post('/channels/:channelId/ban/:userId')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(LoggedInGuard)
    @Roles(Role.ADMIN, Role.OWNER)
    async banUserFromChannel(@Param('userId') bannedId:string, @Param ('channelId') channelId:string, @Req() req:Request){
        try
        {
            const userId = req.user['id'] as string;
            await this.chatService.banUser(userId, bannedId, channelId);
        }
        catch(error)
        {
            throw new HttpException(
                "You don't have the permission to ban that User",
                HttpStatus.FORBIDDEN);
        }
    }

    // update channel
    // @Patch('/channels/update')
    // @UseGuards(LoggedInGuard)
    // @Roles(Role.OWNER)
    // async updateChannelSetting(@Body() updateChannelDto:updateChannelDto){

    // }
    

    // kick User
    @Delete('/channels/:channelId/kick/:userid')
    @UseGuards(LoggedInGuard)
    @Roles(Role.ADMIN, Role.OWNER)
    async kickUser(@Param('channelId') channelId:string, @Param('userid') userId:string,@Req() req:Request){
        try{
            const userId = req.user['id'] as string;
            await this.chatService.leaveChannel(channelId, userId);
        }
        catch (error)
        {
            throw new HttpException(
                'The User you are Trying to kick is not in the channel.',
                HttpStatus.NOT_FOUND
            )
        }
    }

    // Mute User
    @Post('/channels/:channelId/mute/:userid')
    @UseGuards(LoggedInGuard)
    @Roles(Role.OWNER, Role.ADMIN)
    async MuteUser(@Param('channelId') channelId:string, @Param('userid') mutedId:string, @Req() req:Request){
        try{
            const userId = req.user['id'] as string;
            await this.chatService.muteUser(userId, mutedId, channelId);
        }
        catch(error)
        {
            throw new HttpException(
                'You cannot Mute This User.',
                HttpStatus.FORBIDDEN
            )
        }
    }


    // kick user [testing]
    // ban/unban user [testing]
    // mute/unmute user [not started]
    // update channel [not started]
    // channelInvite [not started]
}
