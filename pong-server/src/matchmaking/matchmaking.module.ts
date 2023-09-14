import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MatchmakingController } from './matchmaking.controller';
import { MatchmakingConsumer } from './matchmaking.consumer';
import { MatchmakingService } from './matchmaking.service';

@Module({
  imports: [BullModule.registerQueue({ name: 'playerQueue' })],
  controllers: [MatchmakingController],
  exports: [MatchmakingConsumer, MatchmakingService],
  providers: [MatchmakingConsumer, MatchmakingService],
})
export class MatchmakingModule {}
