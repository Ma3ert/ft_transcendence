import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Req,
    Res,
    UseGuards
} from '@nestjs/common';
import { LoggedInGuard } from 'src/auth/utils/LoggedIn.guard';
import { createChannelDto } from './dto/channel.create.dto';
import { ChatService } from './chat.service';
import { joinChannelDto } from './dto/joinChannel.dto';
import { Role } from '@prisma/client';
import { Roles } from './decorator/role.decorator';
import { Request } from 'express';
import { RoleGuard } from './role.guard';
import { changeChannelPasswordDto, setPasswordDto } from './dto/channelPassword.dto';
import { changeChannelName } from './dto/changeChannelName.dto';
import { BanGuard } from './ban.guard';


@Controller('chat')
export class ChatController {
    constructor(private chatService:ChatService) {}

    // create Channel !! clean
    @Post('/channels')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(LoggedInGuard)
    async CreateChannel(@Body() createChannelDto:createChannelDto, @Req() req:Request){
        try{
            const userId = req.user['id'] as string;
            await this.chatService.createChannel(userId, createChannelDto);
            return {status:"success", message:"create channel successfully"};
        } catch(error){
            return {status:"failure", message:`${error}`};
        }
    }
    
    // delete Channel !! clean
    @Delete('/channels/:channelId')
    @Roles(Role.OWNER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async deleteChannel(@Param('channelId') channel:string, @Req() req:Request){
        const userId = req.user['id'] as string;
        await this.chatService.deleteChannelById(userId, channel);
        return {status:"success", message:"delete channel successfully"};
    }

    // User Join a Channel !! Clean
    @Post('/channels/:channelId/join/')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(LoggedInGuard)
    async joinChannel(@Param('channelId') channelId:string, @Body() joinchannelDto:joinChannelDto, @Req() req:Request){
        try{
            const userId = req.user['id'] as string;
            await this.chatService.userJoinChannel(userId, channelId, joinchannelDto.password);
            return {status:"success", message:"joined channel successfully"};
        }
        catch(error){
            return {status:"failure", message:`${error}`};
        }
    }

    // leave channel !!Clean
    @Delete('/channels/:channelId/leave')
    @Roles(Role.ADMIN, Role.MEMBER, Role.OWNER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async leaveChannel(@Param('channelId') channelId:string, @Req() req:Request){
        const userId = req.user['id'] as string;
        await this.chatService.leaveChannel(channelId, userId);
        return {status:"success", message:"left successfully"};
    }

    // get channel Members !!Clean
    @Get('/channels/:channelId/members/')
    @Roles(Role.ADMIN, Role.MEMBER, Role.OWNER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async channelMembers(
        @Param('channelId') channelId:string,
        @Req() req:Request){
            const userId = req.user['id'] as string;
            return await this.chatService.getChannelMembers(channelId, userId);
    }

    // upgrade user to admin !!Clean
    @Patch('/channels/:channelId/upgrade/:upgradeuser')
    @UseGuards(BanGuard)
    @Roles(Role.OWNER, Role.ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async changePermission(
        @Param('channelId') channelId:string,
        @Param('upgradeuser') upgradeuser:string,
        @Req() req:Request){
        try{
            const user = req.user['id'] as string;
            await this.chatService.upgradeUser(user, upgradeuser, channelId);
            return {status:"success", message:"upgrade successfully"};
        }
        catch (error)
        {
            return {status:"failure", message:`${error}`};
        }
    }

    // down grade user to member !!Clean
    @Patch('/channels/:channelId/downgrade/:downgradeuser')
    @UseGuards(BanGuard)
    @Roles(Role.OWNER, Role.ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async downGradePersmission(
        @Param('channelId') channelId:string,
        @Param('downgradeuser') downgradeuser:string,
        @Req() req:Request)
    {
        try{
            const user = req.user['id'] as string;
            await this.chatService.downgradeUser(user, downgradeuser, channelId);
            return {status:"success", message:"downgrade successfully"};
        }
        catch (error)
        {
            return {status:"failure", message:`${error}`};

        }
    }

    // get channel messages !!Clean
    @Get('/channels/:channelId/messages/')
    @Roles(Role.ADMIN, Role.MEMBER, Role.OWNER)
    @UseGuards(LoggedInGuard, RoleGuard)
    async getChannelmessage(
        @Query('skip', ParseIntPipe) skip:number,
        @Query('take', ParseIntPipe) take:number,
        @Param('channelId') channelId:string,
        @Req() req:Request){
            const userId = req.user['id'] as string;
            return this.chatService.getChannelMessages(skip, take, channelId);
    }

    // get direct message of a conversation Not yet (after matich complete the block and friend Request)
    @Get('/direct/:friendId/messages/')
    @UseGuards(LoggedInGuard)
    async getDirectMessage(
        @Query('skip', ParseIntPipe) skip:number,
        @Query('take', ParseIntPipe) take:number,
        @Param('friendId') friend:string,
        @Req() req:Request){
            const userId = req.user['id'] as string;
        return this.chatService.getDMs(userId,friend, skip, take);
    }


    @Delete('/channels/:channelId/unban/:userId')
    @UseGuards(BanGuard)
    @Roles(Role.ADMIN, Role.OWNER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async unBanUserFromChannel(
        @Param('channelId') channelId:string,
        @Param('userId') userId:string,
        @Req() req:Request){
        try
        {
            const user = req.user['id'] as string;
            await this.chatService.unbanUser(user, userId, channelId);
            return {status:"success", message:"unbanned successfully"};
        }
        catch(error){
            return {status:"failure", message:`${error}`};
        }
    }

    @Post('/channels/:channelId/ban/:userId')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(BanGuard)
    @Roles(Role.ADMIN, Role.OWNER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async banUserFromChannel(
        @Param('userId') bannedId:string,
        @Param ('channelId') channelId:string,
        @Req() req:Request){
        try
        {
            const userId = req.user['id'] as string;
            await this.chatService.banUser(userId, bannedId, channelId);
            return {status:"success", message:"banned successfully"};
        }
        catch(error)
        {
            return {status:"failure", message:`${error}`};
        }
    }

    // kick User
    @Delete('/channels/:channelId/kick/:userid')
    @UseGuards(BanGuard)
    @Roles(Role.ADMIN, Role.OWNER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async kickUser(
        @Param('channelId') channelId:string,
        @Param('userid') userId:string,
        @Req() req:Request){
        await this.chatService.leaveChannel(channelId, userId);
    }

    // Mute User
    @Post('/channels/:channelId/mute/:userid')
    @UseGuards(BanGuard)
    @Roles(Role.OWNER, Role.ADMIN)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async MuteUser(
        @Param('channelId') channelId:string,
        @Param('userid') mutedId:string,
        @Req() req:Request){
            try{
                await this.chatService.muteUser(mutedId, channelId);
                return {status:"success", message:"Muted successfully"};
            }
            catch(error)
            {
                return {status:"failure", message:`${error}`};
            }
    }

    // sent invite
    @Post('/channels/:channelId/sent/:userId')
    @UseGuards(BanGuard)
    @Roles(Role.OWNER, Role.ADMIN, Role.MEMBER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async sendInvite(
        @Param('channelId') channelId:string,
        @Param('userId') userId:string,
        @Req() req:Request){
        try{
            const user = req.user['id'] as string;
            await this.chatService.createChannelInvite(user, userId, channelId);
            return {status:"success", message:"Invite sent successfully"};
        }
        catch(error)
        {
            return {status:"failure", message:`${error}`};
        }
    }

    // accept invite
    @Post('/channels/:channelId/accept/')
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async acceptInvite(
        @Param('channelId') channelId:string,
        @Body() joinchannelDto:joinChannelDto,
        @Req() req:Request){
        try{
            const user = req.user['id'] as string;
            await this.chatService.userJoinChannel(user, channelId, joinchannelDto.password);
            await this.chatService.deleteChannelInvite(user, channelId);
            return {status:"success", message:"Invite accepted"};
        }
        catch(error)
        {
            return {status:"failure", message:`${error}`};
        }
    }


    // decline
    @Delete('/channels/:channelId/decline/')
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async declineInvite(
        @Param('channelId') channelId:string,
        @Req() req:Request){
            const user = req.user['id'] as string;
            await this.chatService.deleteChannelInvite(user, channelId);
    }

    @Get('/channels/')
    @UseGuards(LoggedInGuard)
    async getUserChannel(@Req() req:Request)
    {
        const user = req.user['id'] as string;
        return await this.chatService.getAllUserChannels(user);
    }

    @Get('/direct/')
    @UseGuards(LoggedInGuard)
    async getUserConversation(@Req() req:Request)
    {
        const user = req.user['id'] as string;
        return this.chatService.getUserConversations(user);
    }

    @Patch('/channels/:channelId/change-password')
    @Roles(Role.OWNER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async changeChannelPassword(
        @Body() changePasswordDto:changeChannelPasswordDto,
        @Param('channelId') channelId:string,
        @Req() req:Request){
            try{
                await this.chatService.changeChannelPassword(channelId, changePasswordDto);
                return {status:"success", message:"password changed Successfully"};
            }
            catch(error){
                return {status:"failure", message:`${error}`};
            }
    }

    @Patch('/channels/:channelId/remove-password')
    @Roles(Role.OWNER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async removeChannelPassword(
        @Param('channelId') channelId:string,
        @Req() req:Request){
            await this.chatService.removeChannelPassword(channelId);
            return {status:"success", message:"password removed Successfully"};
    }

    @Patch('/channels/:channelId/set-password')
    @Roles(Role.OWNER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async setChannelPassword(
        @Body() changePasswordDto:setPasswordDto,
        @Param('channelId') channelId:string,
        @Req() req:Request){
            await this.chatService.setChannelPassword(channelId, changePasswordDto.password);
            return {status:"success", message:"password set Successfully"};
    }

    @Patch('/channels/:channelId/change-name')
    @Roles(Role.OWNER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async changeChannelName(
        @Body() changeChannelName:changeChannelName,
        @Param('channelId') channelId:string,
        @Req() req:Request){
            await this.chatService.changeChannelName(channelId, changeChannelName.name);
            return {status:"success", message:"Channel Name Changed Successfully"};
    }

    @Get('/channels/invites')
    @UseGuards(LoggedInGuard)
    async getChannelsInvites(@Req() req: Request)
    {
        const user = req.user['id'] as string;
        return await this.chatService.getChannelInvites(user);
    }

    @Get('/channels/:channelId/role')
    @Roles(Role.OWNER, Role.ADMIN, Role.MEMBER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async getUserRole(@Param('channelId') channelId:string, @Req() req:Request)
    {
        const user = req.user['id'] as string;
        return await this.chatService.getUserRoleInCahannel(channelId, user);
    }

    @Get('/channels/:channelId')
    @Roles(Role.OWNER, Role.ADMIN, Role.MEMBER)
    @UseGuards(RoleGuard)
    @UseGuards(LoggedInGuard)
    async getChannel(@Param('channelId') channelId:string, @Req() req:Request)
    {
        return await this.chatService.getChannelById(channelId);
    }
    
}