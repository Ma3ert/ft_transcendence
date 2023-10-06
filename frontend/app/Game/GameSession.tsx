"use client";
import React, { useEffect, useState } from 'react'
import Ball from './Ball'
import FirstRaquette from './Player'
import SecondRaquette from './Other'
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
  useEffect(() => {
    socket.on("updateGame", (data: Room) => {
      setRoom(data)
  })
  return () => {
    socket.off("updateGame");
  }
  },[newRoom])
  return (
    <>
      
    </>
  )
}

export default GameSession