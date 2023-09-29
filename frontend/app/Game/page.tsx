"use client";
import { Box, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Ball from "./Ball"
import {getBallTrajectory, getBallPositions, Point, getOtherPosition} from "./gameEngine"
import FirstRaquette from "./FirstRaquette"
import GameSession from "./GameSession"
import io, { Socket } from "socket.io-client"

import {Room, Player} from "./server/index"

type Props = {}

const player: Player = {
  id: 1,
  playerPosition: {x: 270, y: 803},
  otherPosition: {x: 0, y: 339},
  bottomLeft: {x: 270, y: 803},
  topLeft: {x: 460, y: 339},
  ballPositions: getBallPositions({x: 270, y: 803}, {x: 460, y: 339}, 900, 400),
  ballTrajectory: [{x: 270, y: 803}, {x: 270, y: 803}],
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

const roomD: Room = {
  id: "",
  players: [player, player],
  gameState: ""
}


export default function Home() {
  const [data, setData] = useState<Room>(roomD);
  const [playerIndex, setIndex] = useState(0);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3002");

    console.log("the component rendered");
    setSocket(newSocket);
    newSocket.on("connect", () => {
      newSocket.emit("join");
      newSocket.on("player", (n: number) => {
        setIndex(n - 1);
      });
      newSocket.on("startedGame", (data: Room) => {
        console.log("the setter is fired");
        setData(data);
      });
    });

    // Remember to clean up the socket connection when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [setSocket]);

  console.log("before return");

  return (
    <>
      {socket ? <Text color={"#fff"}>the game is loading...</Text> : <GameSession room={data} playerIndex={playerIndex} socket={socket}/>}
    </>
  );
}
