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
    const user = await this.prismaService.user.findUnique({
      where: {
        id: friendId,
      },
    });

    if (user) {
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
    }
  }

  removeUser(id: string) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
