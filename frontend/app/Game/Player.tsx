import { Image, Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Point } from './gameEngine';
import { Socket } from "socket.io-client"

interface KeyEvent {
    player: number; // The players who's emitting the event
    key: string; // these are obvious
    room: string; // The id of the room that you will change its based on the key you've received
}

type Props = {
    socket: Socket;
    w: string;
    h: string;
    x: number;
    y: number;
    gameState: string;
    color: string;
    roomId: string;
    playerId: number;
}

const Player = ({socket, w, h, x, y, color, gameState, roomId, playerId}: Props) => {
    return (
        <Box
            position={"absolute"}
            w={w}
            h={h}
            left={x}
            top={y}
            bg={color}
            borderRadius={20}
        >
        </Box>
    )
}

export default Player