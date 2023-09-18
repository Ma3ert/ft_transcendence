import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Socket } from 'socket.io';

interface GameSession {
    player1: {
        ballX: number,
        ballY: number
        score: number,
        playerPosition: number
    },
    player2: {
        ballX: number,
        ballY: number
        score: number,
        playerPosition: number
    }
}

@Injectable()
export class GameService {
    private gameSessions: Map<string, GameSession> = new Map()
    constructor(){}

    createGameSession(player1: Socket, player2: Socket)
    {
        const GameSession = randomUUID();
        //! Should create an entry in the game table
        //! Should change the players status to in match
        player1.join(GameSession);
        player2.join(GameSession);
        //! Should put the initial game state in the gameSessions map
        //! Should emit the initial game state in room-specific variable
        return GameSession;
    }

    getGameInput(roomName: string, payload: any)
    {
        //! Should handle key press event and update the game state
        //! Emit the latest state to the room
    }

    getPlayerSession(player: Socket)
    {
        return player.rooms.values().next().value;
    }

    leaveGameSession(player: Socket)
    {
       const gameSession = this.getPlayerSession(player);
       if (gameSession)
        player.leave(gameSession);

       //! Should emit in that room that the player has disconnected.
       //! Should change the user status to online not in game anymore
    }
}
