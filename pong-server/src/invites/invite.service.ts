import { Injectable } from '@nestjs/common';
import { UserInvite } from '@prisma/client';
import { Invite } from './entities/invite.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInviteDto } from './dto/create-invite.dto';

@Injectable()
export class InviteService {
  constructor(private readonly prismaService: PrismaService) {}
  async createInvite(inviteBody: CreateInviteDto) {
    const checkInviteExists = await this.prismaService.userInvite.findMany({
      where: {
        inviteOwnerId: inviteBody.inviteOwnerId,
        inviteUserId: inviteBody.invitedUserId,
      },
    });
    if (checkInviteExists.length !== 0) {
      return null;
    }

    const user = await this.prismaService.user.findUnique({
      where: {
        id: inviteBody.inviteOwnerId,
      },
      include: {
        friendsList: true,
        friendOf: true,
      },
    });
    const friendsList = [
      ...user.friendsList.map((friend) => friend.id),
      ...user.friendOf.map((friend) => friend.id),
    ];
    if (friendsList.includes(inviteBody.invitedUserId)) {
      return null;
    }
    return this.prismaService.userInvite.create({
      data: {
        inviteOwner: {
          connect: {
            id: inviteBody.inviteOwnerId,
          },
        },
        invitedUser: {
          connect: {
            id: inviteBody.invitedUserId,
          },
        },
      },
    });
  }

  getSendInvites(inviteOwnerId: string) {
    return this.prismaService.userInvite.findMany({
      where: {
        inviteOwner: {
          id: inviteOwnerId,
        },
      },
      include: {
        invitedUser: {
          select: {
            id: true,
            avatar: true,
            status: true,
            username: true,
          },
        },
        inviteOwner: {
          select: {
            id: true,
            avatar: true,
            status: true,
            username: true,
          },
        },
      },
    });
  }

  getReceivedInvites(inviteUserId: string) {
    return this.prismaService.userInvite.findMany({
      where: {
        invitedUser: {
          id: inviteUserId,
        },
      },
      include: {
        invitedUser: {
          select: {
            id: true,
            avatar: true,
            status: true,
            username: true,
          },
        },
        inviteOwner: {
          select: {
            id: true,
            avatar: true,
            status: true,
            username: true,
          },
        },
      },
    });
  }

  async getInviteReadyList(userId: string) {
    // List all the users that i can send a friend request to.
    const sentInvites: any[] = await this.getSendInvites(userId);
    const receivedInvites: any[] = await this.getReceivedInvites(userId);
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        friendsList: true,
        friendOf: true,
      },
    });
    const users = await this.prismaService.user.findMany();
    const invitesUsers = [...sentInvites.map((invite) => invite.inviteUserId), ...receivedInvites.map((invite) => invite.inviteOwnerId)];
    const userFriends = [...user.friendsList.map((user) => user.id), ...user.friendOf.map((user) => user.id)];
    const excludedUsers = [user.id, ...invitesUsers, ...userFriends];

    return users.filter((user) => !excludedUsers.includes(user.id));
  }

  async checkInviteById(inviteId: string) {
    return await this.prismaService.userInvite.findUnique({
      where: {
        id: inviteId,
      },
    });
  }

  async acceptInvite(inviteId: string, inviteUserId: string) {
    const invite: UserInvite = await this.checkInviteById(inviteId);
    // Check the current user is authorized to accept the invite.
    if (invite.inviteUserId !== inviteUserId) return null;
    await this.prismaService.user.update({
      where: {
        id: invite.inviteOwnerId,
      },
      data: {
        friendsList: {
          connect: {
            id: inviteUserId,
          },
        },
      },
    });
    // Delete the invite
    return await this.prismaService.userInvite.delete({
      where: {
        id: inviteId,
      },
    });
  }

  async removeInvite(inviteId: string, inviteUserId: string) {
    const invite: UserInvite = await this.checkInviteById(inviteId);
    if (invite.inviteOwnerId !== inviteUserId) return null;
    return this.prismaService.userInvite.delete({
      where: {
        id: inviteId,
      },
    });
  }
}
