import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Socket, Server } from 'socket.io';
import { AuthSocket } from 'src/auth/utils/WsLoggedIn.guard';
import {
  NO_SUCH_INVITE,
  GAME_SESSION_STARTING,
  GAME_UPDATE,
  INVALID_INVITE,
  NEW_INVITE,
  NO_PLAYERS_AVAILABLE,
  ONGOING_MATCH,
  START_GAME_SESSION,
  USER_ACCEPTED_INVITE,
  USER_DENIED_INVITE,
  USER_INMATCH,
  INVITE_SENT,
  INVITE_CANCELED,
  UNAUTHORIZED_INVITE_ACTION,
  JOINED_GAME_QUEUE,
} from './utils/events';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';

export interface Game {
  id: string;
  winner?: string;
  playerOneScore?: number;
  playerTwoScore?: number;
  createdAt?: Date;
}

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
  players: Player[];
  updateInterval?: NodeJS.Timeout;
}

export interface MatchItem {
  staggedPlayer?: Player;
  players: Player[];
}

@Injectable()
export class GameService {
  constructor(private readonly usersService: UsersService, private readonly prismaService: PrismaService) {}

  private allPlayers: Map<string, User> = new Map();
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
      players: [playerOne, playerTwo],
    });

    // Change the player status to in match
    this.usersService.updateUserAll(playerOne.user, { status: 'INMATCH' });
    this.usersService.updateUserAll(playerTwo.user, { status: 'INMATCH' });

    // Emit the player number.
    server.to(playerOne.socket.id).emit('player', playerOne.id);
    server.to(playerTwo.socket.id).emit('player', playerTwo.id);
    // Join player to the same game session.
    playerOne.socket.join(gameSessionID);
    playerTwo.socket.join(gameSessionID);
    server.to(gameSessionID).emit(GAME_SESSION_STARTING);
    // Notify the user that we're going to start the session
    setTimeout(() => {
      server.to(gameSessionID).emit(START_GAME_SESSION, this.gameSessions.get(gameSessionID));
      this.gameStarted(gameSessionID, server);
    }, 3000);
  }

  createGameInvite(sendingPlayer: AuthSocket, receivingPlayer: AuthSocket, server: Server) {
    if (this.allPlayers.size > 0 && this.allPlayers.has(sendingPlayer.user.id))
      return server.to(sendingPlayer.id).emit(ONGOING_MATCH); // User who's sent the invite is in match
    if (this.allPlayers.size > 0 && this.allPlayers.has(receivingPlayer.user.id))
      return server.to(receivingPlayer.id).emit(USER_INMATCH); // User who's receiving the invite is in match

    const sessionInvite = randomUUID();
    const playerOne = this.createPlayer(sendingPlayer, 1);
    const playerTwo = this.createPlayer(receivingPlayer, 2);
    this.gameInvites.set(sessionInvite, { players: [playerOne], staggedPlayer: playerTwo });
    // Add the player for the in match check
    this.allPlayers.set(sendingPlayer.user.id, sendingPlayer.user);

    server.to(receivingPlayer.id).emit(NEW_INVITE, { invite: sessionInvite, user: sendingPlayer.user });
    server.to(sendingPlayer.id).emit(INVITE_SENT, { invite: sessionInvite });
    setTimeout(() => {
      if (this.gameInvites.has(sessionInvite) && this.gameInvites.get(sessionInvite).players.length == 1) {
        this.gameInvites.delete(sessionInvite);
        this.allPlayers.delete(sendingPlayer.user.id);
        server.to(sendingPlayer.id).emit(USER_DENIED_INVITE);
        server.to(receivingPlayer.id).emit(INVITE_CANCELED);
      }
    }, 30000);
  }

  cancelGameInvite(player: AuthSocket, gameInviteId: string, server: Server) {
    if (!this.gameInvites.has(gameInviteId)) {
      server.to(player.id).emit(NO_SUCH_INVITE);
    }
    const invite = this.gameInvites.get(gameInviteId);
    if (invite.players.length == 2) return;
    const receivingPlayer = invite.staggedPlayer;

    server.to(receivingPlayer.socket.id).emit(INVITE_CANCELED);
    this.allPlayers.delete(player.user.id);
    this.gameInvites.delete(gameInviteId);
  }

  acceptGameInvite(player: AuthSocket, gameInviteId: string, server: Server) {
    // Check if the session still exists in the gameInvites
    if (!this.gameInvites.has(gameInviteId)) {
      server.to(player.id).emit(NO_SUCH_INVITE);
    }
    const sessionInvite = this.gameInvites.get(gameInviteId);
    // Check the invite authorization
    if (player.user.id !== sessionInvite.staggedPlayer.user)
      server.to(player.id).emit(UNAUTHORIZED_INVITE_ACTION);
    // Move player from stagging to players array
    if (sessionInvite.players.length == 1) {
      this.gameInvites.set(gameInviteId, {
        players: [...sessionInvite.players, sessionInvite.staggedPlayer],
        staggedPlayer: undefined,
      });
    }
    // Display invite state
    console.log(this.gameInvites.get(gameInviteId));

    // When the user accept add this user to users array
    this.allPlayers.set(player.user.id, player.user);
    // Emit event to playerOne to notify him that invite has been accepted
    const sendingUser = sessionInvite.players.find((player) => player.id == 1);
    if (!sendingUser) return server.to(player.id).emit(INVALID_INVITE);
    server.to(sendingUser.socket.id).emit(USER_ACCEPTED_INVITE);
  }

  denyGameInvite(player: AuthSocket, gameInviteId: string, server: Server) {
    // Check if the invite exists
    if (!this.gameInvites.has(gameInviteId)) {
      server.to(player.id).emit(NO_SUCH_INVITE);
    }
    const sessionInvite = this.gameInvites.get(gameInviteId);
    // Check that player matches stagged player as proof of invite ownership
    if (player.user.id !== sessionInvite.staggedPlayer.user)
      server.to(player.id).emit(UNAUTHORIZED_INVITE_ACTION);
    // Emit to sending player that the game invite is denied
    server.to(sessionInvite.players[0].socket.id).emit(USER_DENIED_INVITE);
    // Remove players from the allPlayers map
    this.allPlayers.delete(sessionInvite.players[0].user);
    this.allPlayers.delete(sessionInvite.staggedPlayer.user);
    // Remove the invite Session from the map
    this.gameInvites.delete(gameInviteId);
  }

  joinGameQueue(player: AuthSocket, server: Server) {
    // Checking if the user is in match before joinning the queue
    if (this.allPlayers.size > 0 && this.allPlayers.has(player.user.id))
      return server.to(player.id).emit(ONGOING_MATCH);
    // Emit player joined queue event
    server.to(player.id).emit(JOINED_GAME_QUEUE);

    // Check if a game session already exists just join the user otherwise create a new one
    const lastSession = Array.from(this.gameQueue)[this.gameQueue.size - 1];
    if (this.gameQueue.size > 0 && lastSession[1].players.length == 1) {
      const gameSession = lastSession[0];
      const playerOne = lastSession[1].players[0];
      const playerTwo = this.createPlayer(player, 2);
      this.allPlayers.set(player.user.id, player.user);
      this.gameQueue.set(gameSession, { players: [playerOne, playerTwo] });
      //TODO: Send the users information about each other.
      console.log('Game Session: ', gameSession, this.gameQueue.get(gameSession));
    } else {
      const gameSession = randomUUID();
      const playerOne = this.createPlayer(player, 1);
      this.gameQueue.set(gameSession, {
        players: [playerOne],
      });
      this.allPlayers.set(player.user.id, player.user);
      // Wait for 15 seconds if you don't find a match emit noPlayersAvaiable to the player
      setTimeout(() => {
        if (this.gameQueue.has(gameSession) && this.gameQueue.get(gameSession).players.length == 1) {
          this.gameQueue.delete(gameSession);
          this.allPlayers.delete(player.user.id);
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

  //! We might not need this logic
  gameStarted(session: string, server: Server) {
    //TODO: write state watcher function to compare between the old state and the one and emit events.
    const gameSession = this.gameSessions.get(session);
    const interval = setInterval(() => {
      server.to(session).emit(GAME_UPDATE, { data: this.gameSessions.get(session).players });
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

  async endGameSession(gameSessionId: string) {
    //TODO: Determine the winner
    //TODO: Do the caluculation of how much the xp and laddel should increment by and save that for each user
    //TODO: Create an entry in the game table <>
    await this.createGame;
    //TODO: Remove both players from the players array
    //TODO: Check users status to ONLINE again
    //TODO: Quit the game session (ROOM)
    //TODO: Clear the interval for that game sesion
    //*: Remove the item from the game sessions map
    this.gameSessions.delete(gameSessionId);
  }

  createGame(gameSessionId: string) {
    const gameSession = this.gameSessions.get(gameSessionId);
    const playerOne = gameSession.players[0];
    const playerTwo = gameSession.players[1];
    return this.prismaService.game.create({
      data: {
        id: gameSessionId,
        players: {
          connect: [{ id: playerOne.user }, { id: playerTwo.user }],
        },
        playerOneScore: playerOne.score,
        playerTwoScore: playerTwo.score,
        winner: playerOne.score > playerTwo.score ? playerOne.user : playerTwo.user,
      },
    });
  }

  leaveGameSession(player: Socket) {
    //! This function should be refactored to use the endGameSession with few exceptions.
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
  }
}
