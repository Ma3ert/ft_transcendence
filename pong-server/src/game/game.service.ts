import { Injectable, Logger } from '@nestjs/common';
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
import { stripPlayerSockets } from './utils/utils';

export interface Game {
  id: string;
  winner?: string;
  playerOneScore?: number;
  playerTwoScore?: number;
  createdAt?: Date;
}

export interface Ball {
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export interface Player {
  id: number;
  user: string;
  username: string;
  avatar: string;
  socket: Socket;
  score: number;
  x: number;
  y: number;
}

export interface GameSession {
  winner: number;
  players: Player[];
  ball: Ball;
  updateInterval?: NodeJS.Timeout;
}

export interface MatchItem {
  staggedPlayer?: Player;
  players: Player[];
  playerOne?: Socket;
  playerTwo?: Socket;
}

@Injectable()
export class GameService {
  constructor(private readonly usersService: UsersService, private readonly prismaService: PrismaService) {}

  private allPlayers: Map<string, User> = new Map();
  private gameSessions: Map<string, GameSession> = new Map();
  private gameQueue: Map<string, MatchItem> = new Map();
  private gameInvites: Map<string, MatchItem> = new Map();

  createSessionData(session: string) {
    const gameSession = this.gameSessions.get(session);
    const serializedGameSession = stripPlayerSockets(gameSession);
    return serializedGameSession;
  }

  createPlayer(player: AuthSocket, id: number) {
    const state: Player = {
      id,
      socket: player,
      user: player.user.id,
      username: player.user.username,
      avatar: player.user.avatar,
      score: 0,
      x: id === 1 ? 0 : 400,
      y: id === 1 ? 200 : 245,
    };
    return state;
  }

  createGameSession(playersData: Player[], server: Server) {
    const gameSessionID = randomUUID();
    const playerOne = playersData[0];
    const playerTwo = playersData[1];

    this.gameSessions.set(gameSessionID, {
      winner: 0,
      ball: {
        x: 400,
        y: 245,
        dx: Math.random() < 0.5 ? 1 : -1,
        dy: 0,
      },
      players: [playerOne, playerTwo],
    });

    // Change the player status to in match
    this.usersService.updateUserAll(playerOne.user, { status: 'INMATCH' });
    this.usersService.updateUserAll(playerTwo.user, { status: 'INMATCH' });

    // Join player to the same game session.
    playerOne.socket.join(gameSessionID);
    playerTwo.socket.join(gameSessionID);
    setTimeout(() => {
      server.to(gameSessionID).emit(START_GAME_SESSION, this.createSessionData(gameSessionID));
      this.gameStarted(gameSessionID, server);
    }, 4000);
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
      return server.to(player.id).emit(NO_SUCH_INVITE);
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
    this.createGameSession(this.gameInvites.get(gameInviteId).players, server);
    this.gameInvites.delete(gameInviteId);
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
    if (this.allPlayers.size > 0 && this.allPlayers.has(player.user.id)) {
      console.log('Already in match.');
      return server.to(player.id).emit(ONGOING_MATCH);
    }
    // Emit player joined queue event
    server.to(player.id).emit(JOINED_GAME_QUEUE);

    // Check if a game session already exists just join the user otherwise create a new one
    const lastSession = Array.from(this.gameQueue)[this.gameQueue.size - 1];
    if (this.gameQueue.size > 0 && lastSession[1].players.length == 1) {
      const gameSession = lastSession[0];
      const playerOne = lastSession[1].players[0];
      const playerTwo = this.createPlayer(player, 2);
      this.allPlayers.set(player.user.id, player.user);
      this.gameQueue.set(gameSession, { ...lastSession[1], players: [playerOne, playerTwo] });
      // Send the users information about each other.
      if (playerOne) {
        const { socket, ...playerTwoData } = playerTwo;
        playerOne.socket.emit('matchMade', {
          data: { ...playerTwoData, session: gameSession, playerID: playerOne.id },
        });
      }
      if (playerTwo) {
        const { socket, ...playerOneData } = playerOne;
        playerTwo.socket.emit('matchMade', {
          data: { ...playerOneData, session: gameSession, playerID: playerTwo.id },
        });
      }
      this.createGameSession(this.gameQueue.get(gameSession).players, server);
      this.gameQueue.delete(gameSession);
    } else {
      const gameSession = randomUUID();
      const playerOne = this.createPlayer(player, 1);
      this.gameQueue.set(gameSession, {
        players: [playerOne],
        playerOne: player,
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

  gameStarted(session: string, server: Server) {
    const SPEED = 8;
    if (this.gameSessions.has(session)) {
      const gameSession = this.gameSessions.get(session);
      let interval = setInterval(() => {
        gameSession.ball.x += gameSession.ball.dx * SPEED;
        gameSession.ball.y += gameSession.ball.dy * SPEED;

        // Check if player one hits the ball
        if (
          gameSession.ball.x < 30 &&
          gameSession.ball.y > gameSession.players[0].y &&
          gameSession.ball.y < gameSession.players[0].y + 100
        ) {
          gameSession.ball.dx = 1;

          // change ball direction
          if (gameSession.ball.y < gameSession.players[0].y + 30) {
            gameSession.ball.dy = -1;
          } else if (gameSession.ball.y > gameSession.players[0].y + 30) {
            gameSession.ball.dy = 1;
          } else {
            gameSession.ball.dy = 0;
          }
        }

        // Check if player two hits the ball
        if (
          gameSession.ball.x > 780 &&
          gameSession.ball.y > gameSession.players[1].y &&
          gameSession.ball.y < gameSession.players[1].y + 100
        ) {
          gameSession.ball.dx = -1;

          // change ball direction
          if (gameSession.ball.y < gameSession.players[1].y + 30) {
            gameSession.ball.dy = -1;
          } else if (gameSession.ball.y > gameSession.players[1].y + 30) {
            gameSession.ball.dy = 1;
          } else {
            gameSession.ball.dy = 0;
          }
        }

        // If ball hits the side walls check its direction
        if (gameSession.ball.y < 5 || gameSession.ball.y > 490) {
          gameSession.ball.dy *= -1;
        }

        // Check if player scored
        if (gameSession.ball.x < 5) {
          gameSession.players[1].score += 1;
          gameSession.ball.x = 395;
          gameSession.ball.y = 245;
          gameSession.ball.dx = 1;
          gameSession.ball.dy = 0;
          // Here i should emit a score event
        }

        if (gameSession.ball.x > 795) {
          gameSession.players[0].score += 1;
          gameSession.ball.x = 395;
          gameSession.ball.y = 245;
          gameSession.ball.dx = -1;
          gameSession.ball.dy = 0;
          // Here i should emit a score event
        }

        if (gameSession.players[0].score === 3) {
          gameSession.winner = 1;
          server.to(session).emit('endGame', gameSession);
          clearInterval(interval);
        }

        if (gameSession.players[1].score === 3) {
          gameSession.winner = 2;
          server.to(session).emit('endGame', gameSession);
          clearInterval(interval);
        }

        server.to(session).emit('updateGame', gameSession);
      }, 1000 / 60);
    }
  }

  async endGameSession(gameSessionId: string) {
    const gameSession = this.gameSessions.get(gameSessionId);
    const playerOne = gameSession.players[0];
    const playerTwo = gameSession.players[1];
    const playerOneUser = await this.usersService.findById(playerOne.user);
    const playerTwoUser = await this.usersService.findById(playerTwo.user);
    const levelOneXP = 100;
    const winnerReward = 50;
    const expFactor = 1.5;

    //Do the caluculation of how much the xp and laddel should increment by and save that for each user
    if (playerOne.score != 0 && playerTwo.score != 0 && playerOne.score != playerTwo.score) {
      const winner = playerOne.score > playerTwo.score ? playerOneUser : playerTwoUser;
      const requiredNextLevelXP = levelOneXP * Math.floor(Math.pow(expFactor, winner.level));
      if (winner.xp + winnerReward >= requiredNextLevelXP)
        await this.usersService.updateUserAll(winner.id, { level: winner.level + 1 });
      await this.usersService.updateUserAll(winner.id, { xp: winner.xp + winnerReward });
    }

    //change users status to ONLINE again
    await this.usersService.updateUserAll(playerOne.user, { status: 'ONLINE' });
    await this.usersService.updateUserAll(playerTwo.user, { status: 'ONLINE' });
    // Create an entry in the game table
    await this.createGame(gameSessionId);
    // TODO: Should send some data to both players about the winner and the loser
    // Remove both players from the players array
    this.allPlayers.delete(playerOne.user);
    this.allPlayers.delete(playerTwo.user);
    // Quit the game session (ROOM)
    playerOne.socket.leave(gameSessionId);
    playerTwo.socket.leave(gameSessionId);
    // Remove the item from the game sessions map.
    this.gameSessions.delete(gameSessionId);
  }

  createGame(gameSessionId: string) {
    const gameSession = this.gameSessions.get(gameSessionId);
    const playerOne = gameSession.players[0];
    const playerTwo = gameSession.players[1];
    let winner = null;

    if (playerOne.score != 0 && playerTwo.score != 0 && playerOne.score != playerTwo.score)
      winner = playerOne.score > playerTwo.score ? playerOne.user : playerTwo.user;
    return this.prismaService.game.create({
      data: {
        id: gameSessionId,
        players: {
          connect: [{ id: playerOne.user }, { id: playerTwo.user }],
        },
        playerOneScore: playerOne.score,
        playerTwoScore: playerTwo.score,
        winner,
      },
    });
  }

  leaveGameSession(leavingPlayer: AuthSocket, server: Server) {
    this.gameSessions.forEach((game) => {
      const gameSessionPlayers = game.players.map((player) => player.user);
      if (gameSessionPlayers.includes(leavingPlayer.user.id)) {
        const otherPlayer = game.players.filter((player) => player.user !== leavingPlayer.user.id)[0];
        otherPlayer.socket.emit('userLeftGame');
      }
    });
  }
}
