import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Socket, Server } from 'socket.io';
import { AuthSocket } from 'src/auth/utils/WsLoggedIn.guard';
import { GAME_SESSION_STARTING, GAME_UPDATE, NO_PLAYERS_AVAILABLE, ONGOING_MATCH, START_GAME_SESSION } from './utils/events';

export interface Player {
  id: number;
  user: string;
  socket: Socket;
  ballX: number;
  ballY: number;
  score: number;
  playerX: number;
  playerY: number;
}

export interface GameSession {
  sessionId: string;
  players: Player[];
  updateInterval?: NodeJS.Timeout;
}

export interface MatchItem {
  players: Player[];
}

@Injectable()
export class GameService {
  private gameSessions: Map<string, GameSession> = new Map();
  private gameQueue: Map<string, MatchItem> = new Map();
  private gameInvites: Map<string, MatchItem> = new Map();

  createPlayer(player: AuthSocket, id: number) {
    const state: Player = {
      id,
      socket: player,
      user: player.user.id,
      ballX: 0,
      ballY: 0,
      score: 0,
      playerX: 0,
      playerY: 0,
    };
    return state;
  }

  createGameSession(playersData: Player[], server: Server) {
    const gameSessionID = randomUUID();
    const playerOne = playersData[0];
    const playerTwo = playersData[1];

    this.gameSessions.set(gameSessionID, {
      sessionId: gameSessionID,
      players: [playerOne, playerTwo],
    });
    //TODO: Should change the players status to in match

    // Emit the player number.
    server.to(playerOne.socket.id).emit('player', playerOne.id);
    server.to(playerTwo.socket.id).emit('player', playerTwo.id);
    // Join player to the same game session.
    playerOne.socket.join(gameSessionID);
    playerTwo.socket.join(gameSessionID);
    server.to(gameSessionID).emit(GAME_SESSION_STARTING);
    // Notify the user that we're going to start the session
    setTimeout(() => {
      server
        .to(gameSessionID)
        .emit(START_GAME_SESSION, this.gameSessions.get(gameSessionID));
      this.gameStarted(gameSessionID, server);
    }, 3000);
  }

  createGameInvite(player: AuthSocket, server: Server, payload: any) {
    if (player.user.status === 'INMATCH') {
      return server.to(player.id).emit(ONGOING_MATCH);
    }
  }

  acceptGameInvite() {
    //TODO: Add the second user if he accepts the invite.
  }

  joinGameQueue(player: AuthSocket, server: Server) {
    // Validation condition to access this function only if the player status !== INMATCH
    if (player.user.status === 'INMATCH') {
      return server.to(player.id).emit(ONGOING_MATCH);
    }
    const lastSession = Array.from(this.gameQueue)[this.gameQueue.size - 1];
    if (this.gameQueue.size > 0 && lastSession[1].players.length == 1) {
      const gameSession = lastSession[0];
      const playerOne = lastSession[1].players[0];
      const playerTwo = this.createPlayer(player, 2);
      this.gameQueue.set(gameSession, { players: [playerOne, playerTwo] });
      //TODO: Update both players status to inmatch here.
      console.log('Game Session: ', gameSession, this.gameQueue.get(gameSession));
    } else {
      const gameSession = randomUUID();
      const playerOne = this.createPlayer(player, 1);
      this.gameQueue.set(gameSession, {
        players: [playerOne],
      });
      // Wait for 15 seconds if you don't find a match emit noPlayersAvaiable to the player
      setTimeout(() => {
        if (this.gameQueue.get(gameSession).players.length == 1) {
          this.gameQueue.delete(gameSession);
          server.to(player.id).emit(NO_PLAYERS_AVAILABLE);
        }
      }, 15000);
    }
  }

  getGameInput(payload: any) {
    //TODO: Should get the room id from the player
    //TODO: Update the state and emit a gameUpdate state the interval will handle the update
  }

  getPlayerSession(player: Socket) {
    // Return the room that the player is part of
    return player.rooms.values().next().value;
  }

  gameStarted(session: string, server: Server) {
    //TODO: write state watcher function to compare between the old state and the one and emit events.
    const gameSession = this.gameSessions.get(session);
    const interval = setInterval(() => {
      server.to(session).emit(GAME_UPDATE, { data: gameSession.players });
    }, 1000 / 60);
    this.gameSessions.set(session, {
      ...gameSession,
      updateInterval: interval,
    });
  }

  gameSessionLauncher(server: Server) {
    console.log('Starting the game session watcher');
    // setInterval(() => {
    //   console.log('Started game session watcher');
    // }, 3000);
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
