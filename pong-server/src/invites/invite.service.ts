import { Injectable } from '@nestjs/common';
import { UserInvite } from '@prisma/client';
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

    //* Check if i already have that friend in the friends list.

    const user = await this.prismaService.friendsList.findFirst({
      where: {
        owner: inviteBody.inviteOwnerId,
      },
      include: {
        users: true,
      },
    });
    const friends = user.users.map((friend) => friend.id);
    if (friends.includes(inviteBody.invitedUserId)) return null;

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

  async checkCanInviteUser(invitedUser: string, requestUser: string) {
    const users = (await this.getInviteReadyList(requestUser)).map((user) => user.id);
    if (!users.includes(invitedUser)) {
      const invite = await this.prismaService.userInvite.findFirst({
        where: {
          OR: [
            {
              inviteUserId: requestUser,
              inviteOwnerId: invitedUser,
            },
            {
              inviteUserId: invitedUser,
              inviteOwnerId: requestUser,
            },
          ],
        },
      });
      if (invite) return invite;
    }
    return null;
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
    const user = await this.prismaService.friendsList.findUnique({
      where: {
        id: userId,
      },
      include: {
        users: true,
      },
    });
    const users = await this.prismaService.user.findMany();
    const invitesUsers = [
      ...sentInvites.map((invite) => invite.inviteUserId),
      ...receivedInvites.map((invite) => invite.inviteOwnerId),
    ];
    const userFriends = user.users.map((friend) => friend.id);
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
    await this.prismaService.friendsList.update({
      where: {
        owner: invite.inviteOwnerId
      },
      data: {
        users: {
          connect: {
            id: invite.inviteUserId
          }
        }
      }
    })

    await this.prismaService.friendsList.update({
      where: {
        owner: invite.inviteUserId
      },
      data: {
        users: {
          connect: {
            id: invite.inviteOwnerId
          }
        }
      }
    })

    // Delete the invite.
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
