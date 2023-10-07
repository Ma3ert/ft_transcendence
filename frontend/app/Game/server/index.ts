import { Server }  from "socket.io";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import http from "http";

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

export function gameInitializer(game: Room, sender: number, reciever: number)
{
}
  
export function servePlayerAction(action: KeyEvent, game: Room)
{}

export function serveBallAction(action: BallEvent, game: Room)
{}

let rooms: (Room | undefined)[] = [];

const createPlayer = (id: number, join: ResponsiveEvent) => {
  const playerWidth = 20
  const newTable: Table = {
    tableBg: "#1D222C",
    tableH: 200,
    tableW: 100,
  }
  const player: Player = {
    id: id,
    roomId: "",
    xPos: id === 0 ? newTable.tableW - playerWidth + 10 : 10,
    yPos: newTable.tableH / 2,
    playerW: playerWidth,
    playerH: 50,
    table: newTable
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
      room = gameInitializer(room, 0, 1);
      
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
        startGame(room);
      }, 5000);
    } else {
      room = {
        id: uuidv4(),
        players: [createPlayer(0, join)],
        gameState: "init"
      };
      // console.log("the first player just arrived: ", room.id)
      room.players[0].roomId = room.id;
      rooms.push(room);
      socket.join(room.id);
      socket.emit("player", 0);
    }
  });

  socket.on("responsive", (event: BallEvent) => {
    let room: any = rooms.find((room: any) => room.id === event.room);
    // Here you might wanna check if the ball has reached the end
    // and check if the player is in the correct position
    console.log("recived a ball event: ", event);
    if (room){
        room = serveBallAction(event, room);
    }
    rooms = rooms.map((r: any) => {
        if (r.id === room.id) {
            return room;
        } else {
            return r;
        }
    });
    
    if (room) io.to(room.id).emit("updateGame", room);
});

socket.on("keyEvent", (event: KeyEvent) => {
    let room: any = rooms.find((room: any) => room.id === event.room);
    
    // The following room.players[event.player - 1].y is just an example for you to follow
    console.log("received a key event: ", event.player);
    if (room) {
      room = servePlayerAction(event, room);
    }

    // Here you update the global rooms array which contains every game session state
    rooms = rooms.map((r: any) => {
      if (r.id === room.id) {
        return room;
      } else {
        return r;
      }
    });

    if (room) 
    {
      io.to(room.id).emit("updateGame", room);
      console.log("the update event is sent");
    }
  });

  socket.on("leave", (roomID) => {
    socket.leave(roomID);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected: ", socket.id);
  });

});

const startGame = (room: Room | undefined) => {
  // here should be an infinite loop or an interval that will monitor the game and
  // update the players score'
  console.log("the game Started")
  const interval:NodeJS.Timeout = setInterval(() => {
    if (room?.gameState === "gameFinished")
      clearInterval(interval);
  }, 10);
};

server.listen(3002, () => {
  console.log("Server listenning on port 10000000");
});
