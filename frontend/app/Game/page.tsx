"use client";
import { Box, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Ball from "./Ball"
import {getBallTrajectory, getBallPositions, Point, getOtherPosition} from "./gameEngine"
import FirstRaquette from "./Player"
import GameSession from "./GameSession"
import io, { Socket } from "socket.io-client"
import { socket } from "./socket";

import {Room, Player} from "./server/index"

type Props = {}


export default function Home() {
  // const [set, setSetter] = useState(false);
  // const [playerIndex, setIndex] = useState(0);
  // const [clientSocket, setSocket] = useState(socket);

  // useEffect(() => {
  //   clientSocket.connect();

  //   clientSocket.on("connect", () => {
  //     clientSocket.emit("join");
  //   });

  //   return () => {
  //     clientSocket.off("connect");
  //   }
  // }, []);

  // useEffect(() => {
  //   clientSocket.on("player", (n: number) => {
  //     setIndex(n - 1);
  //   });

  //   clientSocket.on("startedGame", (data: Room) => {
  //     setData(data);
  //     setSetter(true);
  //   });

  //   return () => {
  //     clientSocket.off("player");
  //     clientSocket.off("startedGame");
  //   };
  // }, [set]);

  return (
    <>
      <GameSession playerIndex={1} socket={socket}/>
    </>
  );
}
