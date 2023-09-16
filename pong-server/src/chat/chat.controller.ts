import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoggedInGuard } from 'src/auth/utils/LoggedIn.guard';
import { createChannelDto } from './dto/channel.create.dto';
import { ChatService } from './chat.service';
import { Request, Response } from 'express';
import { joinChannelDto } from './dto/joinChannel.dto';

@Controller('chat')
export class ChatController {
    constructor(private chatService:ChatService) {}

    @Post('/channels')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(LoggedInGuard)
    async CreateChannel(@Body() createChannelDto:createChannelDto, @Req() req:Request){
        try{
            console.log(req.user);
            const channel = await this.chatService.createChannel(createChannelDto);
            return channel;
        } catch(error){
            throw new HttpException(
                'channel Creation error',
                HttpStatus.INTERNAL_SERVER_ERROR,
                )
        }
    }

    // User Join a Channel
    // now the user will join the channel without any constraints.
    @Post('/channels/join')
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(LoggedInGuard)
    async joinChannel(@Body() joinchannelDto:joinChannelDto, @Req() req:Request){
        try{
            const userId = req.user['id'] as string;
            if (!userId || userId === undefined)
                return ;
            await this.chatService.userJoinChannel(joinchannelDto);
        }
        catch(error){
            throw new HttpException(
                "User Cnnot Join the channel",
                HttpStatus.INTERNAL_SERVER_ERROR
            )
        }
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

    @Get('/channels/messages/:channelId')
    @UseGuards(LoggedInGuard)
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
