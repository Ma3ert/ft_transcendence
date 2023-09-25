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
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        username: updateUserDto.username,
        avatar: updateUserDto.avatar,
      },
    });
  }

  updateUserAuth(id: string, updateUserDto: AuthUserDto)
  {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto
      },
    });
  }

  removeUser(id: string) {
    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
