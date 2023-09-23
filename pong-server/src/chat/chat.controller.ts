import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { LoggedInGuard } from 'src/auth/utils/LoggedIn.guard';
import { createChannelDto } from './dto/channel.create.dto';
import { ChatService } from './chat.service';
import { joinChannelDto } from './dto/joinChannel.dto';
import { Role } from '@prisma/client';
import { Roles } from './decorator/role.decorator';
import { Request } from 'express';
import { ChangePermissionDto } from './dto/changePermission.dto';
import { RoleGuard } from './role.guard';


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
    @Roles(Role.ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
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
    //(Role.ADMIN, Role.MEMBER, Role.OWNER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
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
    //(Role.ADMIN, Role.MEMBER, Role.OWNER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
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

    // to-do
    // create upgrade and downgrade route for user
    //Change permission
    // @Patch('/channels/:channelId/upgrade/')
    // //(Role.OWNER, Role.ADMIN)
    // @UseGuards(RoleGuard)
    // @UseGuards(LoggedInGuard)
    // async changePermission(@Param('channelId') channelId:string, @Body() UserPermission:ChangePermissionDto, @Req() req:Request){
    //     try{
    //         const user = req.user['id'] as string;
    //         await this.chatService.changePermission(user, UserPermission, channelId);
    //     }
    //     catch (error)
    //     {
    //         throw new HttpException(
    //             "You cannot change permission of that User",
    //             HttpStatus.FORBIDDEN)
    //     }
    // }




    // get channel messages
    // return total length
    @Get('/channels/:channelId/messages/')
    //(Role.ADMIN, Role.MEMBER, Role.OWNER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
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
    //(Role.ADMIN, Role.OWNER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async unBanUserFromChannel(@Param('channelId') channelId:string, @Param('userId') userId:string, @Req() req:Request){
        try
        {
            const user = req.user['id'] as string;
            await this.chatService.unbanUser(user, userId, channelId);
        }
        catch(error){
            throw new HttpException(
                `${error}`,
                HttpStatus.FORBIDDEN);
        }
    }

    @Post('/channels/:channelId/ban/:userId')
    @HttpCode(HttpStatus.CREATED)
    //(Role.ADMIN, Role.OWNER)
    // @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async banUserFromChannel(@Param('userId') bannedId:string, @Param ('channelId') channelId:string, @Req() req:Request){
        try
        {
            const userId = req.user['id'] as string;
            await this.chatService.banUser(userId, bannedId, channelId);
        }
        catch(error)
        {
            throw new HttpException(
                "You cannot Ban This User",
                HttpStatus.FORBIDDEN);
        }
    }

    // kick User
    @Delete('/channels/:channelId/kick/:userid')
    @UseGuards(LoggedInGuard)
    @UseGuards(RoleGuard)
    //(Role.ADMIN, Role.OWNER)
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
    //(Role.OWNER, Role.ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
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

}
