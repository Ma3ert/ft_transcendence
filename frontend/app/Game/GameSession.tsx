"use client";
import React, { useEffect, useState } from 'react'
import Ball from './Ball'
import FirstRaquette from './Player'
import SecondRaquette from './Other'
import { Box, Table } from '@chakra-ui/react'
import { Socket } from "socket.io-client"
import {Room, createPlayer} from "./server/index"
import { Point } from './gameEngine';
import PongTable from './PongTable';
import Other from './Other';
import Player from './Player';

interface Props {
  playerIndex: number;
  socket: Socket; 
  room: Room | null
}


const GameSession = ({playerIndex, socket, room}: Props) => {
  const [moving, setMove] = useState(0)
  const [newRoom, setRoom] = useState(room);

  useEffect(() => {
    socket.on("updateGame", (data: Room) => { setRoom(data) })
    return () => {
      socket.off("updateGame");
    }
  },[newRoom])

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp")
    {}
    else if (event.key === "ArrowDown")
    {}
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', (event) => { setMove(0) });
    // moving !== 0 && (py + moving > 0 && py + moving < 350 - 65) && setPy(py + moving)
  return () => {
    window.removeEventListener('keyup', (event) => { setMove(0) });
    window.removeEventListener('keydown', handleKeyDown);
  };
  })
  
  return (
    <>
      <PongTable
        tableBg='#1D222C'
        tableH={350}
        tableW={600}
      >
        <Other
          w="10px"
          h='60px'
          x={600 - 30}
          y={300 / 2}
          gameState=''
          color='#fff'
          roomId=''
          playerId={1} 
        />
        <Player
          socket={socket}
          w={"10px"}
          h='60px'
          x={5}
          y={300 / 2}
          gameState=''
          color='#DC585B'
          roomId=''
          playerId={0}
        />
        <Ball
          yBall={(350 - 20) / 2}
          xBall={(600 - 20) / 2}
          state=""
          ballSize={"20px"}
          roomId=''
        />
      </PongTable>
    </>
  )
}

export default GameSession