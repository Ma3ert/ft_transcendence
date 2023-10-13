import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { NotificationService } from '../notification/notification.service';
import { NotificationModule } from '../notification/notification.module';
import { ChatService } from '../chat/chat.service';

@Module({
  imports: [UsersModule, NotificationModule],
  controllers: [InviteController],
  providers: [
    InviteService,
    PrismaService,
    UsersService,
    AuthService,
    JwtService,
    NotificationService,
    ChatService],
})
export class InvitesModule {}
