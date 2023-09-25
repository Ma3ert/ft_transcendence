import { GameSession } from '../game.service';

type gameSession = Map<string, GameSession>;

export const checkGameState = (prev: gameSession, current: gameSession): boolean => {
  for (let [key, value] of prev) {
    if (!current.has(key)) {
      return false;
    }

    if (current.get(key) !== value) {
      return false;
    }
  }
  return true;
};
