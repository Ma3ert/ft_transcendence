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
      games: validGames
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

    await this.prismaService.userFriends.create({
      data: {
        owner: user.id,
      },
    });
  
    await this.prismaService.blockedUsers.create({
      data: {
        owner: user.id,
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


  // In the case of block add the user to blocker list in the other user just disconnect from his friendlist
  async blockFriend(userId: string, friendId: string) {
    const user = await this.prismaService.userFriends.findUnique({
      where: {
        owner: userId
      },
      include: {
        users: true
      }
    })
    const friends = user.users.map((friend) => friend.id);
    if (!friends.includes(friendId)) return null;

    await this.prismaService.userFriends.update({
      where: {
        owner: userId
      },
      data: {
        users: {
          disconnect: {
            id: friendId,
          }
        }
      }
    })

    await this.prismaService.userFriends.update({
      where: {
        owner: friendId
      },
      data: {
        users: {
          disconnect: {
            id: userId
          }
        }
      }
    })

    return await this.prismaService.blockedUsers.update({
      where: {
        owner: userId
      },
      data: {
        users: {
          connect: {
            id: friendId
          }
        }
      }
    })
  }

  async getUserFriends(userId: string) {
    const user = await this.prismaService.userFriends.findUnique({
      where: {
        owner: userId,
      },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            avatar: true,
            status: true
          }
        },
      }
    });
    return user.users;
  }

  async unblockFriend(userId: string, friendId: string) {
    const user = await this.prismaService.blockedUsers.findUnique({
      where: {
        owner: userId,
      },
      include: {
        users: true,
      },
    });

    const blockedUsers = user.users.map((friend) => friend.id);
    if (!blockedUsers.includes(friendId))
      return null;
    


    await this.prismaService.userFriends.update({
      where: {
        owner: userId
      },
      data: {
        users: {
          connect: {
            id: friendId
          }
        }
      }
    })

    await this.prismaService.userFriends.update({
      where: {
        owner: friendId
      },
      data: {
        users: {
          connect: {
            id: userId
          }
        }
      }
    })

    return await this.prismaService.blockedUsers.update({
      where: {
        owner: userId
      },
      data: {
        users: {
          disconnect: {
            id: friendId
          }
        }
      }
    })
  }

  async checkBlocked(userId: string, friendId: string) {
    const user = await this.prismaService.blockedUsers.findFirst({
      where: {
        owner: userId
      },
      include: {
        users: true
      }
    });

    // cannot read properties of null (reading 'users')
    const friendsList = user && user.users ? user.users.map((friend) => friend.id) : [];

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
