import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { LoggedInGuard } from 'src/auth/utils/LoggedIn.guard';
import { createChannelDto } from './dto/channel.create.dto';
import { ChatService } from './chat.service';
import { joinChannelDto } from './dto/joinChannel.dto';
import { Role } from '@prisma/client';
import { Roles } from './decorator/role.decorator';
import { Request } from 'express';
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
    @Roles(Role.OWNER)
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
    @Roles(Role.ADMIN, Role.MEMBER, Role.OWNER)
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
    @Roles(Role.ADMIN, Role.MEMBER, Role.OWNER)
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

    @Patch('/channels/:channelId/upgrade/:upgradeuser')
    @Roles(Role.OWNER, Role.ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async changePermission(@Param('channelId') channelId:string, @Param('upgradeuser') upgradeuser:string, @Req() req:Request){
        try{
            const user = req.user['id'] as string;
            await this.chatService.upgradeUser(user, upgradeuser, channelId);
            return {status:"success", message:"upgrade successfully"};
        }
        catch (error)
        {
            throw new HttpException(
                `${error}`,
                HttpStatus.UNAUTHORIZED)
        }
    }

    @Patch('/channels/:channelId/downgrade/:downgradeuser')
    @Roles(Role.OWNER, Role.ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async downGradePersmission(@Param('channelId') channelId:string, @Param('downgradeuser') downgradeuser:string, @Req() req:Request)
    {
        try{
            const user = req.user['id'] as string;
            await this.chatService.downgradeUser(user, downgradeuser, channelId);
            return {status:"success", message:"downgrade successfully"};
        }
        catch (error)
        {
            throw new HttpException(
                `${error}`,
                HttpStatus.UNAUTHORIZED)
        }
    }

    // get channel messages
    @Get('/channels/:channelId/messages/')
    @Roles(Role.ADMIN, Role.MEMBER, Role.OWNER)
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
    @Roles(Role.ADMIN, Role.OWNER)
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
    @Roles(Role.ADMIN, Role.OWNER)
    @UseGuards(RoleGuard)
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
    @Roles(Role.ADMIN, Role.OWNER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
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
    @Roles(Role.OWNER, Role.ADMIN)
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

    // sent invite
    @Post('/channels/:channelId/invitesent/:userId')
    @Roles(Role.OWNER, Role.ADMIN, Role.MEMBER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async sendInvite(@Param('channelId') channelId:string, @Param('userId') userId:string, @Req() req:Request){
        try{
            const user = req.user['id'] as string;
            await this.chatService.createChannelInvite(user, userId, channelId);
        }
        catch(error)
        {
            throw new HttpException(
                `${error}`,
                HttpStatus.FORBIDDEN
            )
        }
    }

    // accept invite
    @Delete('/channels/:channelId/inviteaccept/:userId')
    @Roles(Role.OWNER, Role.ADMIN, Role.MEMBER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async acceptInvite(@Param('channelId') channelId:string, @Param('userId') userId:string, @Req() req:Request){
        try{
            const user = req.user['id'] as string;
            await this.chatService.deleteChannelInvite(user, userId, channelId);
        }
        catch(error)
        {
            throw new HttpException(
                `${error}`,
                HttpStatus.FORBIDDEN
            )
        }
    }


    // decline
    @Delete('/channels/:channelId/invitedecline/:userId')
    @Roles(Role.OWNER, Role.ADMIN, Role.MEMBER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async declineInvite(@Param('channelId') channelId:string, @Param('userId') userId:string, @Req() req:Request){
        try{
            const user = req.user['id'] as string;
            await this.chatService.deleteChannelInvite(user, userId, channelId);
        }
        catch(error)
        {
            throw new HttpException(
                `${error}`,
                HttpStatus.FORBIDDEN
            )
        }
    }

    @Get('/channels/')
    @Roles(Role.OWNER, Role.ADMIN, Role.MEMBER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async getUserChannel(@Req() req:Request)
    {
        const user = req.user['id'] as string;
        return await this.chatService.getUserChannels(user);
    }

    @Get('/direct/')
    @UseGuards(LoggedInGuard)
    async getUserConversation(@Req() req:Request)
    {
        const user = req.user['id'] as string;
        return this.chatService.getUserConversations(user);
    }
}