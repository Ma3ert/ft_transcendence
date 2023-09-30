import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { RoleGuard } from './role.guard';
import { AuthModule } from 'src/auth/auth.module';
import { NotificationService } from 'src/notification/notification.service';

@Module({
  providers: [ChatGateway,
              ChatService,
              UsersService,
              AuthService,
              JwtService,
              PrismaService,
              NotificationService,
              ],
  controllers: [ChatController],
  imports: [AuthModule],
  exports:[ChatService]
})
export class ChatModule {}
