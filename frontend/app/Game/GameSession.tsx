"use client";
import React, { useEffect, useState } from 'react'
import Ball from './Ball'
import FirstRaquette from './FirstRaquette'
import SecondRaquette from './SecondRaquette'
import { Box } from '@chakra-ui/react'
import { Socket } from "socket.io-client"
import {Room} from "./server/index"
import { Point } from './gameEngine';

interface Props {
  room: Room;
  playerIndex: number
  socket: Socket; 
}

const GameSession = ({room, playerIndex, socket}: Props) => {
  const [player, setPlayerState] = useState(room.players[playerIndex]);
  const [gameState, setGameState] = useState(room.gameState);
  useEffect(() => {
    socket.on("updateGame", (data: Room) => {
    setPlayerState(data.players[playerIndex])
    setGameState(data.gameState);
  })
  },[player, gameState])
  return (
    <>
      {player.ballPositions.map((point: Point) => (
        <Box
          bg={"#fff"}
          position={"absolute"}
          boxSize={"10px"}
          borderRadius={"full"}
          top={point.y}
          left={point.x}
          >
        </Box>
      ))}
      <Ball
        socket={socket}
        points={player.ballTrajectory}
        state={gameState}
        box={player.ballSize}
        distance={player.distance}
        velocity={player.velocity}
       />
      <FirstRaquette
        socket={socket}
        gameState={gameState}
        playerState={player.state}
        w={player.playerW.toString() + "px"}
        h={player.playerH.toString() + "px"}
        x={player.playerPosition.x}
        y={player.playerPosition.y}
        src={player.playerSrc}
      />
      <SecondRaquette
        w={player.otherW.toString() + "px"}
        h={player.otherH.toString() + "px"}
        x={player.otherPosition.x}
        y={player.otherPosition.y}
        src={player.otherSrc}
      />
    </>
  )
}

export default GameSession