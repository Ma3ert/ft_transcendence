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

interface Player {
	id: number; // the id of the player whether he's the first to shoot or not
	playerPosition: Point; // the position of the player update by the keystrok from the user
	otherPosition: Point; // the position of the opponent update by the keystrok from the other user
	ballTrajectory: Point[]; // the trajectory of the ball
	ballPositions: Point[]; // the position of shooting and receiving the ball
  ballSize: number; // the size of the ball it most responsive
	indexStart: number; // the index from the ball is going
	indexEnd: number; // the index of where the ball is gonna end up
	state: "R" | "S"; // to decide whether the player is a sender or receiver
	shootingPosition: number; // the position where the player gonna shoot the ball
	playerDirection: "left" | "right"; // to decide which side the raquette is facing for the user
	playerW: number; // the width of the raquette
	playerH: number; // the height of the raquette
	playerSrc: string; // the src file of teh image to render for the player
	otherDirection: "left" | "right"; // to decide which side the raquette is face for the other user
	otherW: number; // the width of the raquette for the other user
	otherH: number; // the height of the raquette for the other user
	otherSrc: string; // the src file of the image to render for the other player raquette
	baseLine: number; // the lenght of the baseLine of the table
	topLine: number; // the lenght of the topLine of the table
	topLeft: Point; // the position of the topleft corner of the table
	bottomLeft: Point; // the position of the bottomleft corner of the table
	score: number; // how many point the player scored
	roomId: string; // the id of the room that the player blongs to
	velocity: number; // the velocity of the ball it will increament while the game is progressing
	you: string;
	other: string;
  distance: number;
}

export interface Room {
  id: string;
  players: Player[];
  gameState: string;
}

interface KeyEvent {
    player: number; // The players who's emitting the event
    key: string; // these are obvious
    room: string; // The id of the room that you will change its based on the key you've received
}

interface BallEvent {
  room: string; // we've used this one before
  event: string;
}

export function gameInitializer(game: Room, sender: number, reciever: number)
{
    game.gameState = "reInit";

    const sStart = game.players[sender].indexStart = 0;
    const sEnd = game.players[sender].indexEnd = game.players[sender].shootingPosition;
    game.players[sender].ballTrajectory = getBallTrajectory(game.players[sender].ballPositions[sStart], game.players[sender].ballPositions[sEnd], 10);
	game.players[sender].distance = distCalculation(game.players[sender].ballPositions, sStart, sEnd);
    game.players[sender].playerPosition.x = game.players[sender].bottomLeft.x;
    game.players[sender].state = "S";
    game.players[sender].otherPosition.x = getOtherPosition(game.players[sender].topLeft, game.players[reciever].bottomLeft, game.players[reciever].playerPosition, game.players[reciever].baseLine, game.players[sender].topLine)
    
    const rStart = game.players[reciever].indexStart = 9;
    const rEnd = game.players[reciever].indexEnd = 9 - game.players[sender].indexEnd;
    game.players[reciever].ballTrajectory = getBallTrajectory(game.players[reciever].ballPositions[rStart], game.players[reciever].ballPositions[rEnd], 10);
	game.players[reciever].distance = distCalculation(game.players[reciever].ballPositions, rStart, rEnd);
    game.players[reciever].otherPosition.x = getOtherPosition(game.players[reciever].topLeft, game.players[sender].bottomLeft, game.players[sender].playerPosition, game.players[sender].baseLine, game.players[reciever].topLine)
    game.players[reciever].state = "R";

    return (game);
}

export function checkDirection(start: number, position: number, lineLenght: number): "left" | "right"
{
	if (position - start < lineLenght / 2)
		return ("left");
	return ("right");
}

export function checkBounce(playerPosition: Point, ballPosition: Point): boolean
{
	if (playerPosition.x + 20 >= ballPosition.x && playerPosition.x - 20 <= ballPosition.x)
		return (true);
	return (false);
}

export function getBallTrajectory(start: Point, end: Point, step: number): Point[] {
    const points: Point[] = [];
    const dx = Math.abs(end.x - start.x);
    const dy = Math.abs(end.y - start.y);
    const sx = start.x < end.x ? 1 : -1;
    const sy = start.y < end.y ? 1 : -1;
    let err = dx - dy;
	var count = step;

    let x = start.x;
    let y = start.y;

    while (true) {
		count -= 1;
		if (count === 0)
		{
        	points.push({ x, y });
			count = step;
		}

        if (x === end.x && y === end.y) {
            break;
        }

        const e2 = 2 * err;

        if (e2 > -dy) {
            err -= dy;
            x += sx;
        }

        if (e2 < dx) {
            err += dx;
            y += sy;
        }
    }
    return points;
}

export function getOtherPosition(topLeft: Point, bottomLeft: Point, playerPosition: Point, baseLine: number, topLine: number): number
{
	const positionPercent: number = ((playerPosition.x - bottomLeft.x) / baseLine) * 100;
	var otherPosition: number = topLine - ((positionPercent / 100) * topLine);
	return (otherPosition + topLeft.x);
}

export function getBallPositions(bottomLeft: Point, topLeft: Point, baseLine: number, topLine: number): Point[]
{
	var baseLineSteps: number = baseLine / 5.0;
	var topLineSteps: number = topLine / 5.0;
	var shooting : Point[] = [
		{x: bottomLeft.x, y: bottomLeft.y},
		{x: bottomLeft.x + baseLineSteps, y: bottomLeft.y},
		{x: bottomLeft.x + baseLineSteps * 2, y: bottomLeft.y},
		{x: bottomLeft.x + baseLineSteps * 3, y: bottomLeft.y},
		{x: bottomLeft.x + baseLineSteps * 4, y: bottomLeft.y}
	]
	var receiving : Point[] = [
		{x: topLeft.x, y: topLeft.y},
		{x: topLeft.x + topLineSteps, y: topLeft.y},
		{x: topLeft.x + topLineSteps * 2, y: topLeft.y},
		{x: topLeft.x + topLineSteps * 3, y: topLeft.y},
		{x: topLeft.x + topLineSteps * 4, y: topLeft.y}
	]
	return (shooting.concat(receiving))
}

export function servePlayerAction(action: KeyEvent, game: Room) // this function will take the Action and apply it to the coresponding gameSession
{
	const sender: Player = game.players[0].id === action.player ? game.players[0] : game.players[1];
	const other: Player = sender.id === game.players[0].id ? game.players[1] : game.players[0];
	if (action.key === "space" && game.gameState !== "gameStarted")
		game.gameState = "gameStarted";
	if (action.key === "A" && (game.gameState === "gameStarted" || sender.state === "R"))
	{
		if (sender.playerPosition.x - 10 >= sender.bottomLeft.x)
		{
			sender.playerPosition.x -= 10;
			other.otherPosition.x = getOtherPosition(other.topLeft, other.bottomLeft, sender.playerPosition, sender.baseLine, other.topLine)
			sender.playerDirection = checkDirection(sender.bottomLeft.x, sender.playerPosition.x, sender.baseLine);
			other.otherDirection = sender.playerDirection === "right" ? "left" : "right";
		}
	}
	else if (action.key === "D" && (game.gameState === "gameStarted" || sender.state === "R"))
	{
		if (sender.playerPosition.x + 10 <= sender.bottomLeft.x + sender.baseLine)
		{
			sender.playerPosition.x += 10;
			other.otherPosition.x = getOtherPosition(other.topLeft, other.bottomLeft, sender.playerPosition, sender.baseLine, other.topLine)
			sender.playerDirection = checkDirection(sender.bottomLeft.x, sender.playerPosition.x, sender.baseLine);
			other.otherDirection = sender.playerDirection === "right" ? "left" : "right";
		}
	}
	else if (action.key === "Left" && sender.state === "R")		sender.shootingPosition = 5; // i think I will have to remove the second condition cus I can check it on the client side of the socket
	else if (action.key === "LeftUp" && sender.state === "R")		sender.shootingPosition = 6;
	else if (action.key === "Up" && sender.state === "R")			sender.shootingPosition = 7;
	else if (action.key === "UpRight" && sender.state === "R")	sender.shootingPosition = 8;
	else if (action.key === "Right" && sender.state === "R")		sender.shootingPosition = 9;
	game.players[0].id  === sender.id ? game.players[0] = sender : game.players[0] = other
	game.players[1].id  === sender.id ? game.players[1] = sender : game.players[1] = other
	return (game)
}

export function serveBallAction(action: BallEvent, game: Room)
{
	const reciever: Player = game.players[0].state === "R" ? game.players[0] : game.players[1];
	const sender: Player = game.players[0].state === "S" ? game.players[0] : game.players[1];
	if (checkBounce(reciever.playerPosition, reciever.ballTrajectory[reciever.ballTrajectory.length - 2]))
	{
        reciever.indexStart = reciever.indexEnd;
        reciever.indexEnd = reciever.shootingPosition;
		reciever.ballTrajectory = getBallTrajectory(reciever.ballPositions[reciever.indexStart], reciever.ballPositions[reciever.indexEnd], 10);
		reciever.distance = distCalculation(reciever.ballPositions, reciever.indexStart, reciever.indexEnd)
        reciever.state = "S";
		
        sender.indexStart = sender.indexEnd;
        sender.indexEnd = 9 - reciever.indexEnd;
		sender.ballTrajectory = getBallTrajectory(sender.ballPositions[sender.indexStart], sender.ballPositions[sender.indexEnd], 10);
		reciever.distance = distCalculation(sender.ballPositions, sender.indexStart, sender.indexEnd)
        sender.state = "R";
	}
	else
	{
		sender.score += 1;
        if (sender.score !== 10)
			return (gameInitializer(game, reciever.id, sender.id))
		game.gameState = "gameFinished";
	}
	game.players[0].id  === sender.id ? game.players[0] = sender : game.players[0] = reciever
	game.players[1].id  === sender.id ? game.players[1] = sender : game.players[1] = reciever
    return (game)
}

export function distCalculation(points: Point[], start: number, end: number): number
{
	let greater: number = start < end ? end : start;
	let smaller: number = greater === end ? start : end;
	if (greater - 5 === start)
		return (points[smaller].y - points[greater].y)
	let adj:number = Math.pow(Math.abs(points[start].x - points[end].x), 2)
	let opp:number = Math.pow(Math.abs(points[start].y - points[end].y), 2)
	let hypo:number = Math.sqrt(adj + opp);
	return (hypo);
}

let rooms: (Room | undefined)[] = [];

const createPlayer = (id: number) => {
  if (id === 1)
  {
      const player: Player = {
        id: 0,
        playerPosition: {x: 270, y: 803},
        otherPosition: {x: 0, y: 339},
        bottomLeft: {x: 270, y: 803},
        topLeft: {x: 460, y: 339},
        ballPositions: getBallPositions({x: 270, y: 803}, {x: 460, y: 339}, 900, 400),
        ballTrajectory: [],
        indexStart: 0,
        indexEnd: 7,
        state: "S",
        shootingPosition: 7,
        playerDirection: "left",
        playerW: 150,
        playerH: 150,
        playerSrc: "/playerRaquette/leftFirstRaquette.png",
        otherDirection: "right",
        otherW: 80,
        otherH: 80,
        otherSrc: "/playerRaquette/rightFirstRaquette.png",
        baseLine: 900,
        topLine: 400,
        score: 0,
        roomId: "",
        velocity: 40,
        you : "",
        other: "",
        distance: 0,
        ballSize: 10
	  };
	return player;
  }
  const player: Player = {
		id: 1,
		playerPosition: {x: 270, y: 803},
		otherPosition: {x: 0, y: 339},
		bottomLeft: {x: 270, y: 803},
		topLeft: {x: 460, y: 339},
		ballPositions: getBallPositions({x: 270, y: 803}, {x: 460, y: 339}, 900, 400),
		ballTrajectory: [],
		indexStart: 7,
		indexEnd: 0,
		state: "R",
		shootingPosition: 7,
		playerDirection: "left",
		playerW: 150,
		playerH: 150,
		playerSrc: "/playerRaquette/leftFirstRaquette.png",
		otherDirection: "right",
		otherW: 80,
		otherH: 80,
		otherSrc: "/playerRaquette/rightFirstRaquette.png",
		baseLine: 900,
		topLine: 400,
		score: 0,
		roomId: "",
		velocity: 40,
		you : "",
		other: "",
		distance: 0,
    ballSize: 10
	};
	return player;
};

io.on("connection", (socket) => {
  console.log(`New user connected ${socket.id}`);
  socket.on("join", () => {
    let room: Room | undefined;
    //   Get the last room in the rooms array and check if the length of the last item is 1
    //   it means that a session already the second player should just join.
    if (rooms.length > 0 && rooms[rooms.length - 1]?.players.length === 1) {
      room = rooms[rooms.length - 1];
    }
    // if the room exists just join the second player.
    if (room) {
      console.log("the second player just arrived: ", room.id)
      socket.join(room.id);
      socket.emit("player", 2);

      // add player to room
      room.players.push(createPlayer(1));
      room.players[1].roomId = room.id;
      room = gameInitializer(room, 0, 1);

      // send the startingGame event to the room the players that the game is starting
      io.to(room.id).emit("startingGame");
      setTimeout(() => {
        // Here we're giving you a 5 seconds window in case you wanna go jurk it off (practice l3isawiya) or something
        if (room) 
        {
          room.gameState = "startedGame"
          io.to(room.id).emit("startedGame", room);
        }
        // this function should contain the loop that will run the game
        startGame(room);
      }, 5000);
    } else {
      room = {
        id: uuidv4(),
        players: [createPlayer(0)],
        gameState: "init"
      };
      console.log("the first player just arrived: ", room.id)
      room.players[0].roomId = room.id;
      rooms.push(room);
      socket.join(room.id);
      socket.emit("player", 1);
    }
  });

socket.on("ballReachesEnd", (event: BallEvent) => {
    let room: any = rooms.find((room: any) => room.id === event.room);
    // Here you might wanna check if the ball has reached the end
    // and check if the player is in the correct position
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
    
    /// The following room.players[event.player - 1].y is just an example for you to follow
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

    if (room) io.to(room.id).emit("updateGame", room);
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
  while (room?.gameState !== "gameFinished");
};

server.listen(6000, () => {
  console.log("Server listenning on port 10000000");
});