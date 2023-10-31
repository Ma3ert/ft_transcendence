import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';
import { AuthUserDto } from './dto/auth-user.dto';
import { Game } from '@prisma/client';
import { secureUserObject } from './utils/secureUserObject';

interface GameType extends Game {
  players: User[]
}

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserData(id: string, fields: string[]) {
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
    if (!user) return null;
    const validGames = user.games
      .map((game: Game) => (game.winner !== null ? game : null))
      .filter((game) => game !== null);

    const games = validGames.map((game: GameType) => {
      const opponent = game.players[game.players.findIndex((player) => player.id !== id)];
      const winnerScore = Math.max(game.playerOneScore, game.playerTwoScore);
      const loserScore = Math.min(game.playerOneScore, game.playerTwoScore);
      const won = game.winner === id;
      const score = won ? winnerScore : loserScore;
      const opponentScore = game.winner === opponent.id ? winnerScore : loserScore;
      return {
        opponent,
        won,
        score,
        opponentScore
      }
    })
    const totalGames = validGames.length;
    const numberOfWon = validGames.filter((game: Game) => game.winner === id).length;
    const numberOfLost = totalGames - numberOfWon;
    const data = {
      user: secureUserObject(user, ...fields),
      totalGames,
      numberOfWon,
      numberOfLost,
      games,
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
        blockedBy: true,
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
    const updated =  this.prismaService.user.update({
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
    if (!updated) return null;
    return updated;
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

  async getUserLocalRank(userId: string)
  {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId
      },
      include: {
        friendsList: {
          select: {
            id: true
          }
        }
      }
    })
    if (!user) return null;
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        avatar: true,
        username: true,
        status: true,
        level: true,
        xp: true
      },
      orderBy: {
        xp: 'desc',
      },
    });

    const userFriends = [user.id, ...user.friendsList.map((user) => user.id)];
    const friendsRank = users.filter((user) => userFriends.includes(user.id)).map((user, index) => {
      return { ...user, order: index + 1 };
    });;

    const currentUserRank = friendsRank.findIndex((user) => user.id === userId);
    if (currentUserRank === -1) {
      return null;
    }
    return { ranks: friendsRank, currentRank: friendsRank[currentUserRank].order };
  }

  async getUserGlobalRank(userId: string) {
    const users = await this.prismaService.user.findMany({
      select: {
        id: true,
        avatar: true,
        username: true,
        status: true,
        xp: true,
        level: true
      },
      orderBy: {
        xp: 'desc',
      },
    });
    const usersRank: any[] = users.map((user, index) => {
      return { ...user, order: index + 1 };
    });

    const currentUserRank = usersRank.findIndex((user) => user.id === userId);
    if (currentUserRank === -1) {
      return null;
    }
    return { ranks: usersRank, currentRank: usersRank[currentUserRank].order };
  }
}
