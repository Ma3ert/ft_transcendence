import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { InviteService } from './invite.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { LoggedInGuard } from 'src/auth/utils/LoggedIn.guard';

@Controller('friendslist')
@UseGuards(LoggedInGuard)
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  @Get()
  getUsersFriendsList()
  {

  }

  @Get("invite/available")
  getAvailableUsers(@Req() req: any)
  {
    return this.inviteService.getInviteReadyList(req.user.id);
  }

  @Post("invite")
  create(@Body() createFriendslistDto: CreateInviteDto) {
    return this.inviteService.createInvite(createFriendslistDto);
  }

  @Post("invite/:id/accept")
  acceptInvite(@Param('id') id: string, @Req() req: any)
  {
    return this.inviteService.acceptInvite(id, req.user.id)
  }

  @Get("invite/received")
  async getReceived(@Req() req: any) {
    return await this.inviteService.getReceivedInvites(req.user.id);
  }

  @Get("invite/sent")
  async getSend(@Req() req: any)
  {
    return await this.inviteService.getSendInvites(req.user.id);
  }

  @Delete('invite/:id')
  remove(@Param('id') id: string, @Req() req: any) {
    return this.inviteService.removeInvite(id, req.user.id);
  }
}
