import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { GameModule } from './game/game.module';
import { MatchmakingService } from './matchmaking/matchmaking.service';
import { MatchmakingController } from './matchmaking/matchmaking.controller';
import { MatchmakingModule } from './matchmaking/matchmaking.module';
import { BullModule } from '@nestjs/bull';

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
    MatchmakingModule,
    AuthModule,
    PassportModule.register({ session: true }),
    GameModule,
    MatchmakingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
