import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  createUser(createUserDto: User) {
    return this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        avatar: createUserDto.avatar,
        username: createUserDto.username,
      },
    });
  }

  findOne(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  findById(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        friendsList: true,
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        username: true,
        avatar: true,
        email: true,
        activated: true,
        twoFactor: true,
        pinValidated: true,
      },
    });
  }

  updateUserAll(id: string, updated: User) {
    const user = this.prismaService.user.findUnique({ where: { id } });
    if (!user) return null;
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updated,
      },
    });
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = this.prismaService.user.findUnique({ where: { id } });
    if (!user) return null;
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        username: updateUserDto.username,
        avatar: updateUserDto.avatar,
      },
      select: {
        id: true,
        username: true,
        avatar: true,
        activated: true,
        email: true,
      },
    });
  }

  updateUserAuth(id: string, updateUserDto: AuthUserDto) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async blockFriend(userId: string, friendId: string) {
    const friendsList = await (await this.getUserFriends(userId)).map((user) => user.id);
    if (!friendsList.includes(friendId)) return null;
    try {
      await this.prismaService.user.update({
        where: {
          id: friendId,
        },
        data: {
          friendsList: {
            disconnect: {
              id: userId,
            },
          },
        },
      });
      return await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          friendsList: {
            disconnect: {
              id: friendId,
            },
          },
          blocked: {
            connect: {
              id: friendId,
            },
          },
        },
      });
    } catch (e) {
      return null;
    }
  }

  async getUserFriends(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        friendsList: {
          select: {
            id: true,
            avatar: true,
            username: true,
            status: true,
          },
        },
        friendOf: {
          select: {
            id: true,
            avatar: true,
            username: true,
            status: true,
          },
        },
      },
    });
    return [...user.friendsList, ...user.friendOf];
  }

  async unblockFriend(userId: string, friendId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        blocked: true,
      },
    });

    const blockedUsers = user.blocked.map((blockedItem) => blockedItem.id);
    if (!blockedUsers.includes(friendId)) return null;
    if (user) {
      return await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          blocked: {
            disconnect: {
              id: friendId,
            },
          },
          friendsList: {
            connect: {
              id: friendId,
            },
          },
        },
      });
    }
  }

  // This function will either check if you are blocked by a user of or if you've blocked user
  async checkBlocked(userId: string, friendId: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        blocked: true,
        blockedBy: true,
      },
    });

    const blockedUsers = [
      ...user.blocked.map((blockedUser) => blockedUser.id),
      ...user.blockedBy.map((blockedUser) => blockedUser.id),
    ];
    return blockedUsers.includes(friendId);
  }

  removeUser(id: string) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
