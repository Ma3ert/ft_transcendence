import { Image } from '@chakra-ui/react'
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
    src: string;
    playerState: string;
    roomId: string;
    playerIndex: number;
}

const FirstRaquette = ({socket, w, h, x, y, src, gameState, playerState, roomId, playerIndex}: Props) => {
    const activeKeys: Record<string, boolean> = {};
    console.log("game State from the raquette: ", gameState);
    const handleKeyDown = (event: KeyboardEvent) => {
        console.log("player State from the raquette: ", playerState);
        activeKeys[event.key] = true
        if (event.key.includes("Arrow") && playerState === "S")
        {
            if (activeKeys["ArrowUp"] && activeKeys["ArrowLeft"])
            {
                console.log('the new shooting position is sent')
                const keyEvent: KeyEvent = {player: playerIndex, key: "LeftUp", room: roomId};
                socket.emit("keyEvent", keyEvent)
            }
            else if (activeKeys["ArrowUp"] && activeKeys["ArrowRight"])
            {
                console.log('the new shooting position is sent')
                const keyEvent: KeyEvent = {player: playerIndex, key: "UpRight", room: roomId};
                socket.emit("keyEvent", keyEvent)
            }
            else if (activeKeys["ArrowRight"])
            {
                console.log('the new shooting position is sent')
                const keyEvent: KeyEvent = {player: playerIndex, key: "Right", room: roomId};
                socket.emit("keyEvent", keyEvent)
            }
            else if (activeKeys["ArrowLeft"])
            {
                console.log('the new shooting position is sent')
                const keyEvent: KeyEvent = {player: playerIndex, key: "Left", room: roomId};
                socket.emit("keyEvent", keyEvent)
            }
            else if (activeKeys["ArrowUp"])
            {
                console.log('the new shooting position is sent')
                const keyEvent: KeyEvent = {player: playerIndex, key: "Up", room: roomId};
                socket.emit("keyEvent", keyEvent)
            }
        }
        else if (event.key === "a" && (gameState === "gameStarted" || playerState === "R"))
        {
            const keyEvent: KeyEvent = {player: playerIndex, key: "A", room: roomId};
            socket.emit("keyEvent", keyEvent)
        }
        else if (event.key === "d" && (gameState === "gameStarted" || playerState === "R"))
        {
            const keyEvent: KeyEvent = {player: playerIndex, key: "D", room: roomId};
            socket.emit("keyEvent", keyEvent)
        }
        else if (event.key === " " && playerState === "S")
        {
            const keyEvent: KeyEvent = {player: playerIndex, key: "space", room: roomId};
            socket.emit("keyEvent", keyEvent);
        }
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
        <Image
            position={"absolute"}
            src={src}
            w={w}
            h={h}
            top={y}
            left={x}
        >
        </Image>
    )
}

export default FirstRaquette
