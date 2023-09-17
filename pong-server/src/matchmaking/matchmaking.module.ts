import { Module } from '@nestjs/common';
import { MatchmakingService } from './matchmaking.service';
import { MatchmakingGateway } from './matchmaking.gateway';

@Module({
  providers: [MatchmakingService, MatchmakingGateway],
})
export class MatchmakingModule {}
