import { Server }  from "socket.io";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import http from "http";
import { backIn } from "framer-motion";
import { AccordionButton } from "@chakra-ui/react";

const express = require("express");
const app = express();


app.use(
  cors({
    origin: "*",
    credentials:true,
  })
);

const server = http.createServer(app);
const io = new Server(server);
  
export interface Point {
	x: number;
	y: number;
}

export interface Ball {
  roomId: string;
  xSpeed: number;
  ySpeed: number;
  xPos: number;
  yPos: number;
  ballSize: number;
  moving: number
}

export interface Table {
  tableW: number;
  tableH: number;
  tableBg: string;
}

export interface Player {
  roomId: string;
  xPos: number;
  yPos: number;
  playerW: number;
  playerH: number;
  table: Table;
  id: number;
  moving: number;
}

export interface Room {
  id: string;
  players: Player[];
  ball: Ball;
  gameState: string;
}

interface KeyEvent {
  player: number; // The players who's emitting the event
  key: string; // these are obvious
  room: string; // The id of the room that you will change its based on the key you've received
}

interface ResponsiveEvent{
  windowW: number
  windowH: number
}

interface BallEvent {

}



const gTable: Table = {
  tableBg: "#1D222C",
  tableH: 350,
  tableW: 600,
}

const gBall : Ball = {
  roomId: "",
  xSpeed: 1,
  ySpeed: 2,
  xPos: gTable.tableW - 20 / 2,
  yPos: gTable.tableH - 20 / 2,
  ballSize: 20,
  moving: 0
} 

export function ballInitializer(oldBall: Ball)
{
  const ball: Ball = {
    xSpeed: oldBall.xSpeed * -1,
    ySpeed: oldBall.ySpeed * -1,
    xPos: gTable.tableW - oldBall.ballSize / 2,
    yPos: gTable.tableH - oldBall.ballSize / 2,
    ballSize: oldBall.ballSize,
    roomId: oldBall.roomId,
    moving: 0
  }
  return (ball)
}

export function gameInitializer(room: Room)
{
  const newRoom: Room = room;
  newRoom.ball = ballInitializer(room.ball)
  newRoom.gameState = "reInit"
  return newRoom
}

export function servePlayerAction(action: KeyEvent, game: Room, socket: Socket)
{
  const newPlayers: Player[] = game.players;
  if (action.key === "ArrowUp")
    newPlayers[action.player].moving = -1;
  else if (action.key === "ArrowDown")
    newPlayers[action.player].moving = 1;
  else if (action.key === "stop")
    newPlayers[action.player].moving = 0;
  if (newPlayers[action.player].moving)
  {
    const newPosition = newPlayers[action.player].yPos + newPlayers[action.player].moving
    if ( newPosition > 0 && newPosition < gTable.tableH - newPlayers[action.player].playerH)
    {
      newPlayers[action.player].yPos = newPosition;
    }
  }
  socket.to(game.id).emit("updatePlayer", newPlayers)
  game.players = newPlayers;
  return (game)
}

export function serveBallAction(game: Room, socket: Socket)
{
  const newBall: Ball = game.ball;
  if (newBall.yPos + newBall.ySpeed > 350 - 20 || newBall.yPos + newBall.ySpeed <= 1)
  {
    newBall.ySpeed = newBall.ySpeed * -1
    newBall.yPos = newBall.yPos + newBall.ySpeed
  }
  else
  {
    newBall.yPos = newBall.yPos + newBall.ySpeed
    newBall.xPos = newBall.xPos + newBall.xSpeed
  }
  socket.to(game.id).emit("ballUpdate", newBall);
  game.ball = newBall;
  return game;
}

let rooms: (Room | undefined)[] = [];

export const createPlayer = (id: number, join: ResponsiveEvent) => {
  const playerWidth = 20
  const player: Player = {
    id: id,
    roomId: "",
    xPos: id === 0 ? gTable.tableW - playerWidth + 10 : 10,
    yPos: gTable.tableH / 2,
    playerW: playerWidth,
    playerH: 50,
    table: gTable,
    moving: 0
  }
  return (player)
}

io.on("connection", (socket) => {
  console.log(`New user connected ${socket.id}`);
  socket.on("join", (join: ResponsiveEvent) => {
    let room: Room | undefined;
    //   Get the last room in the rooms array and check if the length of the last item is 1
    //   it means that a session already the second player should just join.
    if (rooms.length > 0 && rooms[rooms.length - 1]?.players.length === 1) {
      room = rooms[rooms.length - 1];
    }
    // if the room exists just join the second player.
    if (room) {
      // console.log("the second player just arrived: ", room.id)
      socket.join(room.id);
      socket.emit("player", 1);

      // add player to room
      room.players.push(createPlayer(1, join));
      room.players[1].roomId = room.id;
      room = gameInitializer(room);
      
      // send the startingGame event to the room the players that the game is starting
      room.gameState = "starting";
      io.to(room.id).emit("startingGame");
      setTimeout(() => {
        // Here we're giving you a 5 seconds window in case you wanna go jurk it off (practice l3isawiya) or something
        if (room) 
        {
          io.to(room.id).emit("startedGame", room);
        }
        // this function should contain the loop that will run the game
        startGame(room, socket);
      }, 5000);
    } else {
      room = {
        id: uuidv4(),
        players: [createPlayer(0, join)],
        gameState: "init",
        ball: gBall
      };
      // console.log("the first player just arrived: ", room.id)
      room.players[0].roomId = room.id;
      rooms.push(room);
      socket.join(room.id);
      socket.emit("player", 0);
    }
  });

//   socket.on("responsive", (event: BallEvent) => {
//     let room: any = rooms.find((room: any) => room.id === event.room);
//     // Here you might wanna check if the ball has reached the end
//     // and check if the player is in the correct position
//     console.log("recived a ball event: ", event);
//     if (room){
//         room = serveBallAction(event, room);
//     }
//     rooms = rooms.map((r: any) => {
//         if (r.id === room.id) {
//             return room;
//         } else {
//             return r;
//         }
//     });
    
//     if (room) io.to(room.id).emit("updateGame", room);
// });

socket.on("keyEvent", (event: KeyEvent) => {
    let room: any = rooms.find((room: any) => room.id === event.room);
    
    // The following room.players[event.player - 1].y is just an example for you to follow
    console.log("received a key event: ", event.player);
    if (room) {
      room = servePlayerAction(event, room, socket);
    }

    // Here you update the global rooms array which contains every game session state
    rooms = rooms.map((r: any) => {
      if (r.id === room.id) {
        return room;
      } else {
        return r;
      }
    });

    // if (room) 
    // {
    //   io.to(room.id).emit("updateGame", room);
    //   console.log("the update event is sent");
    // }
  });

  socket.on("leave", (roomID) => {
    socket.leave(roomID);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
  });

});

const startGame = (room: Room | undefined, socket: Socket) => {
  // here should be an infinite loop or an interval that will monitor the game and
  // update the players score'
  console.log("the game Started")

  const interval:NodeJS.Timeout = setInterval(() => {
    room && serveBallAction(room, socket)
  }, 10);
};

server.listen(3002, () => {
  console.log("Server listenning on port 10000000");
});
