import { Injectable } from '@nestjs/common';
import { UserInvite } from '@prisma/client';
import { Invite } from './entities/invite.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInviteDto } from './dto/create-invite.dto';

@Injectable()
export class InviteService {
  constructor(private readonly prismaService: PrismaService){}

  async createInvite(inviteBody: CreateInviteDto) {
    const checkInviteExists = await this.prismaService.userInvite.findMany({
      where: {
        inviteOwnerId: inviteBody.inviteOwnerId,
        inviteUserId: inviteBody.invitedUserId
      }
    })
    if (checkInviteExists.length !== 0)
      return null;
    return this.prismaService.userInvite.create({
      data: {
        inviteOwner: {
          connect: {
            id: inviteBody.inviteOwnerId
          }
        },
        invitedUser: {
          connect: {
            id: inviteBody.invitedUserId
          }
        }
      }
    })
  }

  getSendInvites(inviteOwnerId: string) {
    return this.prismaService.userInvite.findMany({
      where: {
        inviteOwner: {
          id: inviteOwnerId
        }
      },
      include: {
        invitedUser: true,
        inviteOwner: true
      }
    })
  }

  getReceivedInvites(inviteUserId: string)
  {
    return this.prismaService.userInvite.findMany({
      where: {
        invitedUser: {
          id: inviteUserId
        }
      }
    })
  }

  async getInviteReadyList(userId: string)
  {
    // List all the users that i can send a friend request to.
    const invites: Invite[] = await this.getSendInvites(userId);
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId
      },
      include: {
        friendsList: true
      }
    })
    const users = await this.prismaService.user.findMany();
    const invitesUsers = invites.map((invite) => invite.inviteUserId);
    const userFriends = user.friendsList.map((user) => user.id);
    const excludedUsers = [...invitesUsers, ...userFriends];

    return users.filter((user) => !excludedUsers.includes(user.id))
  }

  async checkInviteById(inviteId: string)
  {
    return await this.prismaService.userInvite.findUnique({
      where: {
        id: inviteId
      }
    });
  }

  async acceptInvite(inviteId: string, inviteUserId: string)
  {
    const invite: UserInvite = await this.checkInviteById(inviteId);
    // Check the current user is authorized to accept the invite.
    if (invite.inviteUserId !== inviteUserId)
      return null;
    return this.prismaService.user.update({
      where: {
        id: invite.inviteUserId
      },
      data: {
        friendsList: {
          connect: {
            id: invite.inviteOwnerId
          }
        }
      }
    })
  }

  async removeInvite(inviteId: string, inviteUserId: string) {
    const invite: UserInvite = await this.checkInviteById(inviteId);
    if (invite.inviteUserId !== inviteUserId)
      return null;
    return this.prismaService.userInvite.delete({
      where: {
        id: inviteId
      }
    })
  }
}
