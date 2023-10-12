import { Injectable } from '@nestjs/common';
import { UserInvite } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class InviteService {
  constructor(private readonly prismaService: PrismaService, private readonly usersService: UsersService) {}
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

    const userFriends = (await this.usersService.getUserFriends(inviteBody.inviteOwnerId)).map(
      (user) => user.id,
    );
    if (userFriends.includes(inviteBody.invitedUserId)) return null;

    const userBlocked = (await this.usersService.getBlockedUsers(inviteBody.inviteOwnerId)).map((user) => user.id)
    if (userBlocked.includes(inviteBody.invitedUserId)) return null;

    const currentBlocked = (await this.usersService.getBlockedUsers(inviteBody.invitedUserId)).map((user) => user.id);
    if (currentBlocked.includes(inviteBody.inviteOwnerId)) return null;

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
    //! This should be refactored to exclude the user am blocked in there friend lists
    const sentInvites: any[] = await this.getSendInvites(userId);
    const receivedInvites: any[] = await this.getReceivedInvites(userId);
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        friendsList: true,
      },
    });
    const users = await this.prismaService.user.findMany();
    const invitesUsers = [
      ...sentInvites.map((invite) => invite.inviteUserId),
      ...receivedInvites.map((invite) => invite.inviteOwnerId),
    ];
    const userFriends = user.friendsList.length > 0 ? user.friendsList.map((friend) => friend.id) : [];
    const excludedUsers = [userId, ...invitesUsers, ...userFriends];
    return users.filter((user) => !excludedUsers.includes(user.id));
  }

  async getInviteById(inviteId: string) {
    return await this.prismaService.userInvite.findUnique({
      where: {
        id: inviteId,
      },
    });
  }

  async acceptInvite(inviteId: string, inviteUserId: string) {
    const invite: UserInvite = await this.getInviteById(inviteId);
    if (invite.inviteUserId !== inviteUserId) return null;
    // Check the current user is authorized to accept the invite.
    await this.prismaService.user.update({
      where: {
        id: invite.inviteOwnerId,
      },
      data: {
        friendsList: {
          connect: {
            id: invite.inviteUserId,
          },
        },
      },
    });

    await this.prismaService.user.update({
      where: {
        id: invite.inviteUserId,
      },
      data: {
        friendsList: {
          connect: {
            id: invite.inviteOwnerId,
          },
        },
      },
    });

    // Delete the invite.
    return await this.prismaService.userInvite.delete({
      where: {
        id: inviteId,
      },
    });
  }

  async removeInvite(inviteId: string) {
    return this.prismaService.userInvite.delete({
      where: {
        id: inviteId,
      },
    });
  }
}
