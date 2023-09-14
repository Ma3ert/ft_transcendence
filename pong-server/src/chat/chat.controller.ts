import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoggedInGuard } from 'src/auth/utils/LoggedIn.guard';
import { createChannelDto } from './dto/channel.create.dto';
import { ChatService } from './chat.service';
import { Request, Response } from 'express';
import { channel } from 'diagnostics_channel';
@Controller('chat')
export class ChatController {
    constructor(private userService: UsersService,
        private chatService:ChatService) {}

    @Get('/')
    @UseGuards(LoggedInGuard)
    async getAllUsers(){
        return this.userService.findAll();
    }

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
}
