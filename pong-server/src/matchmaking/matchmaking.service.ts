import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue, QueueOptions } from 'bull';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MatchmakingService {
  constructor(@InjectQueue('playerQueue') private playerQueue: Queue) {}

  async addPlayer(player: User) {
    await this.playerQueue.add({
      ...player,
    });
  }
}
