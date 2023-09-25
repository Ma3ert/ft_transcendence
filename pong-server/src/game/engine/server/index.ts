import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import http from "http";

const express = require("express");
const app = express();

const server = http.createServer(app);
const io = new Server(server);

app.use(
  cors({
    origin: "*",
  })
);

interface Player {
  id: number;
  score: number;
  x: number;
  y: number;
}

interface Ball {
  x: number;
  y: number;
}

interface Room {
  id: string;
  players: Player[];
  ball: Ball;
}

interface KeyEvent {
  player: number; // The players who's emitting the event
  key: "UP" | "DOWN" | "LEFT" | "RIGHT"; // these are obvious
  room: string; // The id of the room that you will change its based on the key you've received
}

interface BallEvent {
  room: string; // we've used this one before
  ball: Ball; // these are obvious
}

let rooms: (Room | undefined)[] = [];

const createPlayer = (id: number) => {
  const player: Player = {
    id: id,
    x: id === 1 ? 530 : 140,
    y: id === 1 ? 301 : 150,
    score: 0,
  };
  return player;
};

io.on("connection", (socket) => {
  console.log("New user connected");
  socket.on("join", () => {
    let room: Room | undefined;
    //   Get the last room in the rooms array and check if the length of the last item is 1
    //   it means that a session already the second player should just join.
    if (rooms.length > 0 && rooms[rooms.length - 1]?.players.length === 1) {
      room = rooms[rooms.length - 1];
    }
    // if the room exists just join the second player.
    if (room) {
      socket.join(room.id);
      socket.emit("player", 2);

      // add player to room
      room.players.push(createPlayer(2));

      // send the startingGame event to the room the players that the game is starting
      io.to(room.id).emit("startingGame");
      setTimeout(() => {
        // Here we're giving you a 5 seconds window in case you wanna go jurk it off (practice l3isawiya) or something
        if (room) io.to(room.id).emit("startedGame", room);
        // this function should contain the loop that will run the game
        startGame(room);
      }, 5000);
    } else {
      room = {
        id: uuidv4(),
        players: [createPlayer(1)],
        ball: {
          x: Math.random() * 1500,
          y: Math.random() * 600,
        },
      };
      rooms.push(room);
      socket.join(room.id);
      socket.emit("player", 1);
    }
  });

  socket.on("ballReachesEnd", (event: BallEvent) => {
    let room: any = rooms.find((room: any) => room.id === event.room);
    // Here you might wanna check if the ball has reached the end
    // and check if the player is in the correct position
    if (room) io.to(room.id).emit("updateGame", room);
  });

  socket.on("keyEvent", (event: KeyEvent) => {
    let room: any = rooms.find((room: any) => room.id === event.room);

    /// The following room.players[event.player - 1].y is just an example for you to follow
    if (room) {
      if (event.key === "UP") {
        room.players[event.player - 1].y += 200; // Use your brain to why its -1
      } else if (event.key === "DOWN") {
        room.players[event.player - 1].y -= 200; // Am just kidding because you gonna be receiving the either player 1 or 2
        // and in the array the players indexes are 0 and 1
      }
    }

    // Here you update the global rooms array which contains every game session state
    rooms = rooms.map((r: any) => {
      if (r.id === room.id) {
        return room;
      } else {
        return r;
      }
    });

    if (room) io.to(room.id).emit("updateGame", room);
  });

  socket.on("leave", (roomID) => {
    socket.leave(roomID);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const startGame = (room: Room | undefined) => {
  // here should be an infinite loop or an interval that will monitor the game and
  // update the players score
};

server.listen(3000, () => {
  console.log("Server listenning on port 3000");
});
