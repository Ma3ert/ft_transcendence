import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { AuthUserDto } from './dto/auth-user.dto';
import { Game } from '@prisma/client';
import { secureUserObject } from './utils/secureUserObject';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserData(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        games: {
          include: {
            players: {
              select: {
                username: true,
                avatar: true,
                id: true,
                xp: true,
                level: true,
              },
            },
          },
        },
      },
    });

    const validGames = user.games
      .map((game: Game) => (game.winner !== null ? game : null))
      .filter((game) => game !== null);
    const totalGames = validGames.length;
    const numberOfWon = validGames.filter((game: Game) => game.winner === id).length;
    const numberOfLost = totalGames - numberOfWon;
    const data = {
      user: secureUserObject(
        user,
        'twoFactorRetry',
        'twoFactor',
        'twoFactorPin',
        'twoFactorPinExpires',
        'activated',
        'pinValidated',
      ),
      totalGames,
      numberOfWon,
      numberOfLost,
      games: validGames,
    };
    return data;
  }

  async createUser(createUserDto: User) {
    const user = await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        avatar: createUserDto.avatar,
        username: createUserDto.username,
      },
    });

    return user;
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
        blocked: true,
        friendsList: true,
        blockedBy: true
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

  async updateUserAll(id: string, updated: User) {
    const user = await this.findById(id);
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

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        username: updateUserDto.username,
        avatar: updateUserDto.avatar,
        activated: updateUserDto.activated,
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

  // In the case of block add the user to blocker list in the other user just disconnect from his friendlist
  async blockFriend(userId: string, friendId: string) {
    const userFriends = (await this.getUserFriends(userId)).map((friend) => friend.id);
    if (!userFriends.includes(friendId)) return null;

    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        friendsList: {
          disconnect: {
            id: friendId,
          },
        },
      },
    });

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
        blocked: {
          connect: {
            id: friendId,
          },
        },
      },
    });
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
            username: true,
            avatar: true,
            status: true,
          },
        },
      },
    });
    return user && user.friendsList ? user.friendsList : [];
  }

  async unblockFriend(userId: string, friendId: string) {
    const blockedUsers = (await this.getBlockedUsers(userId)).map((user) => user.id);
    if (!blockedUsers.includes(friendId)) return null;

    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        friendsList: {
          connect: {
            id: friendId,
          },
        },
      },
    });

    await this.prismaService.user.update({
      where: {
        id: friendId,
      },
      data: {
        friendsList: {
          connect: {
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
        blocked: {
          disconnect: {
            id: friendId,
          },
        },
      },
    });
  }

  async getBlockedUsers(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        blocked: {
          select: {
            id: true,
            username: true,
            avatar: true,
            status: true,
          },
        },
      },
    });

    return user && user.blocked ? user.blocked : [];
  }

  async checkBlocked(userId: string, friendId: string) {
    const friendsList = (await this.getBlockedUsers(userId)).map((user) => user.id);
    return friendsList.includes(friendId);
  }

  removeUser(id: string) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
