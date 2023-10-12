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

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findById(id);
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

  // In the case of block add the user to blocker list in the other user just disconnect from his friendlist
  // async blockFriend(userId: string, friendId: string) {
  //   const user = await this.findById(userId);
  // const userFriends = (await this.getUserFriends(userId)).map((friend) => friend.id);
  // if (!userFriends.includes(friendId)) return null;

  // await this.prismaService.userFriends.update({
  //   where: {
  //     id: user.friendsListId,
  //   },
  //   data: {
  //     users: {
  //       disconnect: {
  //         id: friendId,
  //       },
  //     },
  //   },
  // });

  // await this.prismaService.userFriends.update({
  //   where: {
  //     id: user.friendsListId,
  //   },
  //   data: {
  //     users: {
  //       disconnect: {
  //         id: userId,
  //       },
  //     },
  //   },
  // });

  // return await this.prismaService.blockedUsers.update({
  //   where: {
  //     id: user.blockedUserId,
  //   },
  //   data: {
  //     users: {
  //       connect: {
  //         id: friendId,
  //       },
  //     },
  //   },
  // });
  // }

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
          },
        },
      },
    });
    return user && user.friendsList ? user.friendsList : [];
  }

  // async unblockFriend(userId: string, friendId: string) {
  //   const user = await this.findById(userId);
  //   const friend = await this.findById(friendId);
  //   const blockedUsers = (await this.getBlockedUsers(userId)).map((user) => user.id);
  //   if (!blockedUsers.includes(friendId)) return null;

  // await this.prismaService.userFriends.update({
  //   where: {
  //     id: user.friendsListId
  //   },
  //   data: {
  //     users: {
  //       connect: {
  //         id: friendId,
  //       },
  //     },
  //   },
  // });

  // await this.prismaService.userFriends.update({
  //   where: {
  //     id: friend.friendsListId
  //   },
  //   data: {
  //     users: {
  //       connect: {
  //         id: userId,
  //       },
  //     },
  //   },
  // });

  // return await this.prismaService.blockedUsers.update({
  //   where: {
  //     id: user.blockedUserId,
  //   },
  //   data: {
  //     users: {
  //       disconnect: {
  //         id: friendId,
  //       },
  //     },
  //   },
  // });
  // }

  // async getBlockedUsers(userId: string) {
  //   const user = await this.findById(userId);
  // const userBlocked = await this.prismaService.blockedUsers.findUnique({
  //   where: {
  //     id: user.blockedUserId
  //   },
  //   include: {
  //     users: true,
  //   },
  // });

  // return userBlocked && userBlocked.users ? userBlocked.users : [];
  // }

  // async checkBlocked(userId: string, friendId: string) {
  // const friendsList = (await this.getBlockedUsers(userId)).map((user) => user.id);
  // return friendsList.includes(friendId);
  // }

  removeUser(id: string) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
