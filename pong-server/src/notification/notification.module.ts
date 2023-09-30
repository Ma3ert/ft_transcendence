import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ChatModule } from 'src/chat/chat.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[ChatModule],
  providers: [NotificationService,
              PrismaService,
              AuthService,
              UsersService,
              JwtService],
  exports:[NotificationService, NotificationModule]
})
export class NotificationModule {}
