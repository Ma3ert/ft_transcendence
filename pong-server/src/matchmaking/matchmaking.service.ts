import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MatchmakingService {
  private matchQueue: User[] = [];

  joinQueue(user: User) {
    if (user.status !== 'INMATCH') this.matchQueue.push(user);
  }

  cancelJoin(user: User) {
    if (user.status !== 'INMATCH')
      this.matchQueue.filter((queueUser) => queueUser.id !== user.id);
  }
}
