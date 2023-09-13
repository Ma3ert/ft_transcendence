import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { GameController } from './game.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'matchmakingQueue',
    }),
  ],
  controllers: [GameController],
})
export class GameModule {
    
}
