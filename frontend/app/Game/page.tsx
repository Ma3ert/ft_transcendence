"use client"
import { Box, Text } from "@chakra-ui/react"
import { Key, ReactNode, useEffect, useState } from "react"
import Ball from "./Ball"
import {getBallTrajectory, getBallPositions, Point, getOtherPosition} from "./gameEngine"
import FirstRaquette from "./FirstRaquette"
import GameSession from "./GameSession"
import io from "socket.io-client"

import {Room, Player} from "./server/index"

type Props = {}

const player: Player = {
  id: 1,
  playerPosition: {x: 270, y: 803},
  otherPosition: {x: 0, y: 339},
  bottomLeft: {x: 270, y: 803},
  topLeft: {x: 460, y: 339},
  ballPositions: getBallPositions({x: 270, y: 803}, {x: 460, y: 339}, 900, 400),
  ballTrajectory: [{x: 270, y: 803}],
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

const roomDzab: Room = {
  id: "zab",
  players: [player, player],
  gameState: "zab"
}

export default function Home() {
  const [body, setBody] = useState(false)
  const [data, setData] = useState<Room>(roomDzab);
  const socket = io("http://localhost:6000", { transports: ['websocket', 'polling', 'flashsocket']})
  console.log("the component redered: ", data)
  var playerIndex = -1;
  var gameState = ""
  socket.on("connect", () => {
    socket.emit("join")
    console.log("I have send the join request");
    socket.on("player", (n: number) => {
      console.log("I have got the role")
      playerIndex = n - 1;
    })

    socket.on("startedGame", (data: Room) => {
      console.log("start event is recieved")
      console.log("index: ", playerIndex)
      gameState = data.gameState;
      console.log("gameState: ", data.gameState)
      console.log("we return the components: ", data.players[playerIndex])
      setBody(true)
      setData(data);
      console.log("the body is updated")
    })
  })
  return (
    <>
      {body ? <Text color={"#fff"}>the game is loading...</Text> : <GameSession room={data} playerIndex={playerIndex} socket={socket}/>}
    </>
  )
}
