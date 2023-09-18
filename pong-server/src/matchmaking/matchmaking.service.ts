import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MatchmakingService {
  private matchQueue: User[] = [];

  async createMatch(user: User) {
    this.matchQueue.push(user);
    this.waitForOtherPlayers(15000);
    
      // !Should return the user that will play in the game session
      // !Should be match according to the xp level
      // !Create a room
  }

  async cancelMatch(user: User) {
    if (user.status !== 'INMATCH')
      this.matchQueue.filter((queueUser) => queueUser.id !== user.id);
  }

  async waitForOtherPlayers(waitAmountMs: number) {
    // This function will wait for a specfic period of time till it finds more
    // players in the matchQueue
    const startTime = Date.now();
    while (true) {
      const passedTime = Date.now() - startTime;
      if (passedTime >= waitAmountMs) break;
      if (this.matchQueue.length >= 2) break;
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    }
  }

  findMatch(user: User) {
    // This function will find the closest player in terms of skill to our input
    // player.
    let ratingMap = [];
    if (this.matchQueue.length == 2)
      return this.matchQueue.filter((matchUser) => matchUser.id !== user.id)[0];
    ratingMap = this.matchQueue.map((matchUser) => matchUser.xp - user.xp);
    return this.matchQueue[ratingMap.indexOf(Math.min(...ratingMap))];
  }
}
