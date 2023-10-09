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


export const stripPlayerSockets = (inputObject) => {
  if (inputObject === null || typeof inputObject !== 'object') {
    return inputObject;
  }

  if (Array.isArray(inputObject)) {
    return inputObject.map((item) => stripPlayerSockets(item));
  }

  const copy = {};
  for (const key in inputObject) {
    if (inputObject.hasOwnProperty(key) && key !== 'socket') {
      copy[key] = stripPlayerSockets(inputObject[key]);
    }
  }
  return copy;
}