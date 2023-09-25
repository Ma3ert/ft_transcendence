import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [PrismaService, UsersService, AuthService, JwtService],
  controllers: [UsersController],
  exports: [PrismaService, UsersService],
})
export class UsersModule {}
