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
    const activeKeys: Record<string, boolean> = {};
    console.log("game State from the raquette: ", gameState);
    const handleKeyDown = (event: KeyboardEvent) => {
        activeKeys[event.key] = true
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', (event) => { delete activeKeys[event.key] });
		return () => {
            window.removeEventListener('keyup', (event) => { delete activeKeys[event.key] });
		    window.removeEventListener('keydown', handleKeyDown);
		};
    })
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