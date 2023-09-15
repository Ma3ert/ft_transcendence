import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('playerQueue')
export class MatchmakingConsumer {
  @Process()
  async joinGameSession(job: Job<any>) {
    const queue = job.queue;
    await this.waitForOtherPlayers(20000, job);
    const playersCount = await queue.count();
    if (playersCount >= 1) {
      console.log('Found opponent');
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
      const jobSe = await queue.getNextJob();
      console.log('Player 1:', job.data.username);
      console.log('Player 2:', jobSe.data.username);
      //! Should alter the user status to INMATCH to check for it later.
    } else {
      console.log('Sorry could not match user, no other users are available.');
    }

    // if (queueLength >= 2) {
    // }
  }

  async waitForOtherPlayers(waitAmount, job: Job<unknown>) {
    const requiredNumber = 1;
    const startTime = Date.now();

    console.log('Waiting [count]: ', await job.queue.count());
    while (true) {
      const queue = job.queue;
      const playerNumber = await queue.count();
      if (playerNumber >= requiredNumber) {
        break;
      }
      const passedTime = Date.now() - startTime;
      if (passedTime >= waitAmount) {
        break;
      }
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(`[${job.data.username}] is searching for a game session...`);
  }
}
