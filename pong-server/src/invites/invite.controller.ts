import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { InviteService } from './invite.service';
import { LoggedInGuard } from 'src/auth/utils/LoggedIn.guard';

@Controller('invites')
@UseGuards(LoggedInGuard)
export class InviteController {
  constructor(private readonly inviteService: InviteService) {}

  // The list of users that are available for invite.
  @Get('users')
  getAvailableUsers(@Req() req: any) {
    return this.inviteService.getInviteReadyList(req.user.id);
  }

  @Post()
  async create(@Body('invitedUser') invitedUserId: string, @Req() req: any) {
    if (invitedUserId === req.user.id)
      return {
        status: 'failure',
        message: 'Invalid invite, the invite owner should differ from the invited user',
      };
    const invite = await this.inviteService.createInvite({
      invitedUserId,
      inviteOwnerId: req.user.id,
    });
    if (!invite) return { status: 'failure', message: 'Could not create invite.' };
    return { status: 'success', message: 'Invite created successfully.' };
  }

  @Post('accept')
  async acceptInvite(@Body('inviteId') id: string, @Req() req: any) {
    const accepted = await this.inviteService.acceptInvite(id, req.user.id);
    if (!accepted)
      return {
        status: 'failure',
        message: 'You are not authrized to accept this invite.',
      };
    return { status: 'success', message: 'Invite accepted successfully.' };
  }

  @Get('received')
  async getReceived(@Req() req: any) {
    const receivedInvites = await this.inviteService.getReceivedInvites(req.user.id);
    return {
      status: 'success',
      count: receivedInvites.length,
      data: receivedInvites,
    };
  }

  @Get('sent')
  async getSend(@Req() req: any) {
    const sentInvites = await this.inviteService.getSendInvites(req.user.id);
    return { status: 'success', count: sentInvites.length, data: sentInvites };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    const deletedInvite = await this.inviteService.removeInvite(id, req.user.id);
    if (deletedInvite) return { status: 'success', message: 'Invite deleted successfully.' };
  }
}
