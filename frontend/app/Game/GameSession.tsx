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
  playerIndex: number;
  socket: Socket; 
}

const GameSession = ({room, playerIndex, socket}: Props) => {
  const [newRoom, setRoom] = useState(room);
  const [gameState, setGameState] = useState(room.gameState);
  console.log("the game session is rendered: ", room);
  useEffect(() => {
    socket.on("updateGame", (data: Room) => {
      setRoom(data)
      setGameState(data.gameState);
  })
  },[newRoom, gameState])
  return (
    <>
      {newRoom.players[playerIndex].ballPositions.map((point: Point) => (
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
        points={newRoom.players[playerIndex].ballTrajectory}
        state={gameState}
        box={newRoom.players[playerIndex].ballSize}
        distance={newRoom.players[playerIndex].distance}
        velocity={newRoom.players[playerIndex].velocity}
        roomId={newRoom.players[playerIndex].roomId}
       />
      <FirstRaquette
        socket={socket}
        gameState={gameState}
        playerState={newRoom.players[playerIndex].state}
        w={newRoom.players[playerIndex].playerW.toString() + "px"}
        h={newRoom.players[playerIndex].playerH.toString() + "px"}
        x={newRoom.players[playerIndex].playerPosition.x}
        y={newRoom.players[playerIndex].playerPosition.y}
        src={newRoom.players[playerIndex].playerSrc}
        roomId={newRoom.players[playerIndex].roomId}
        playerIndex={playerIndex}
      />
      <SecondRaquette
        w={newRoom.players[playerIndex].otherW.toString() + "px"}
        h={newRoom.players[playerIndex].otherH.toString() + "px"}
        x={newRoom.players[playerIndex].otherPosition.x}
        y={newRoom.players[playerIndex].otherPosition.y}
        src={newRoom.players[playerIndex].otherSrc}
      />
    </>
  )
}

export default GameSession