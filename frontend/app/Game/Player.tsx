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
    const [moving, setMove] = useState(0)
    const [py, setPy] = useState(y)
    const handleKeyDown = (event: KeyboardEvent) => {
        console.log("it fires")
        if (event.key === "ArrowUp")
            setMove(-1)
        else if (event.key === "ArrowDown")
            setMove(1)
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', (event) => { setMove(0) });
        moving !== 0 && (py + moving > 0 && py + moving < 350 - 65) && setPy(py + moving)
		return () => {
            window.removeEventListener('keyup', (event) => { setMove(0) });
		    window.removeEventListener('keydown', handleKeyDown);
		};
    })
    return (
        <Box
            position={"absolute"}
            w={w}
            h={h}
            left={x}
            top={py}
            bg={color}
            borderRadius={20}
        >
        </Box>
    )
}

export default Player