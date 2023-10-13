import { Module, forwardRef } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ChatModule } from 'src/chat/chat.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [forwardRef(() => ChatModule)],
  providers: [
    PrismaService,
    NotificationService,
    AuthService,
    UsersService,
    JwtService],
  exports: [NotificationService],
})
export class NotificationModule {}
