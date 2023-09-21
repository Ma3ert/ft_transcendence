import { Socket } from "socket.io";

export class Game {
    room: string;
    playerOne: {
        socket: Socket,
        playerX: number,
        playerY: number,
        ballX: number,
        ballY: number
    }
    playerTwo: {
        socket: Socket,
        playerX: number,
        playerY: number,
        ballX: number,
        ballY: number
    }
}