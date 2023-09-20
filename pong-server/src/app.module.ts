import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { GameModule } from './game/game.module';
import { BullModule } from '@nestjs/bull';
import { ChatModule } from './chat/chat.module';
import { FriendslistModule } from './invites/invite.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({ storage: memoryStorage() }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AuthModule,
    PassportModule.register({ session: true }),
    GameModule,
    ChatModule,
    FriendslistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
