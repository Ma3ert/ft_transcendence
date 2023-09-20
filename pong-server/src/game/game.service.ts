import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Socket, Server } from 'socket.io';
import { AuthSocket } from 'src/auth/utils/WsLoggedIn.guard';

export interface Player {
  id: number;
  user: string;
  socketID: string;
  ballX: number;
  ballY: number;
  score: number;
  playerX: number;
  playerY: number;
}

export interface GameSession {
  roomId: string;
  players: Player[];
  updateInterval?: NodeJS.Timeout;
}

@Injectable()
export class GameService {
  private gameSessions: Map<string, GameSession> = new Map();
  constructor() {}

  createPlayer(player: AuthSocket, id: number) {
    const state: Player = {
      id,
      socketID: player.id,
      user: player.user.id,
      ballX: 0,
      ballY: 0,
      score: 0,
      playerX: 0,
      playerY: 0,
    };
    return state;
  }

  createGameInvite(player: AuthSocket, server: Server)
  {
    // Create a new game session in the map

    // 
  }

  joinGameQueue(player: AuthSocket, server: Server) {
    const lastSession = Array.from(this.gameSessions)[this.gameSessions.size - 1];
    if (lastSession && lastSession[1].players.length == 1) {
      // if a session already exists just join the player
      //! Maybe add a private attribute to a game session to stop queue Player to join invite only game.
      const gameSession = lastSession[0];
      const playerOne = lastSession[1].players[0];
      const playerTwo = this.createPlayer(player, 2);
      this.gameSessions.set(gameSession, {
        ...lastSession[1],
        players: [playerOne, playerTwo],
      });
      player.join(gameSession);
      // Emit the player id
      server.to(player.id).emit('player', 2);
      // Redirect player to game window
      server.to(gameSession).emit('startingGameSession');
      // Wait for 3 seconds to start the game
      setTimeout(() => {
        server
          .to(gameSession)
          .emit('startGameSession', this.gameSessions.get(gameSession));
      }, 3000);
      this.gameStarted(gameSession, server);
    } else {
      const gameSession = randomUUID();
      const playerOne = this.createPlayer(player, 1);
      this.gameSessions.set(gameSession, {
        roomId: gameSession,
        players: [playerOne],
      });
      player.join(gameSession);
      server.to(player.id).emit('player', 1);
      setTimeout(() => {
        if (this.gameSessions.get(gameSession).players.length == 1) {
          this.gameSessions.delete(gameSession);
          server.to(player.id).emit('noPlayersAvailable');
        }
      }, 15000);
    }
    //TODO: Should change the players status to in match
    //TODO: Should put the initial game state in the gameSessions map
    //TODO: Should emit the initial game state in room-specific variable
  }

  getGameInput(payload: any) {
    //TODO: Should get the room id from the player
    //TODO: Update the state and emit a gameUpdate state the interval will handle the update
  }

  getPlayerSession(player: Socket) {
    return player.rooms.values().next().value;
  }

  gameStarted(session: string, server: Server) {
    //TODO: write some sort of differential logic to emit the event only if the new state is diffrence from the old one
    const gameSession = this.gameSessions.get(session);
    const interval = setInterval(() => {
      server.to(session).emit('gameUpdate', { data: gameSession.players });
    }, 1000 / 60);
    this.gameSessions.set(session, {
      ...gameSession,
      updateInterval: interval,
    });
  }

  leaveGameSession(player: Socket) {
    // Get the player game session
    const gameSessionId = this.getPlayerSession(player);
    //TODO: Should create an entry in the game table <>
    //TODO: Should save the player and determine if he lost or won the game. <>
    //TODO: Should emit in that room that the player has disconnected.
    // Clear the session interval;
    const gameSession = this.gameSessions.get(gameSessionId);
    clearInterval(gameSession.updateInterval);
    // Delete it from the sessions map
    this.gameSessions.delete(gameSessionId);
    // Disconnect the player from the session
    if (gameSessionId) player.leave(gameSessionId);

    //! Should change the user status to online not in game anymore
  }
}
