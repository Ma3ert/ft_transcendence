"use client"
import { Box } from "@chakra-ui/react"
import { Key, useEffect, useState } from "react"
import Ball from "./Ball"
import {getBallTrajectory, getBallPositions, Point, getOtherPosition} from "./gameEngine"
import FirstRaquette from "./FirstRaquette"
import GameSession from "./GameSession"
import io from "socket.io-client"

import {Room} from "./server/index"

type Props = {}

export default function Home() {
  const socket = io("http://localhost:6000", { transports: ['websocket', 'polling', 'flashsocket']})
  
  var roomSocket: Room | undefined;
  var playerIndex = -1;
  var gameState = ""
  console.log("chi haja")
  
  socket.on("connect", () => {
    socket.emit("join")
    socket.on("player", (n: number) => {
      console.log("player event is recieved")
      playerIndex = n - 1;
    })
    
    socket.on("startedGame", (data: Room) => {
      console.log("start event is recieved")
      console.log("index: ", playerIndex)
      console.log("index: ", data.gameState)
      roomSocket = data
      gameState = roomSocket.gameState;
      return (
          <GameSession room={data} playerIndex={playerIndex} socket={socket}></GameSession>
      )
    })
  })
}
