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
}

const FirstRaquette = ({socket, w, h, x, y, src, gameState, playerState}: Props) => {
    const activeKeys: Record<string, boolean> = {};
    console.log("the xCord: ", x)
    const handleKeyDown = (event: KeyboardEvent) => {
        activeKeys[event.key] = true
        if (event.key.includes("Arrow") && playerState === "R")
        {
            console.log("if fires ", event.key)
            if (activeKeys["ArrowUp"] && activeKeys["ArrowLeft"])
            {
                const keyEvent: KeyEvent = {player: 1, key: "LeftUp", room: "chihaja"};
                socket.emit("keyEvent", keyEvent)
            }
            else if (activeKeys["ArrowUp"] && activeKeys["ArrowRight"])
            {
                const keyEvent: KeyEvent = {player: 1, key: "UpRight", room: "chihaja"};
                socket.emit("keyEvent", keyEvent)
            }
            else if (activeKeys["ArrowRight"])
            {
                const keyEvent: KeyEvent = {player: 1, key: "Right", room: "chihaja"};
                socket.emit("keyEvent", keyEvent)
            }
            else if (activeKeys["ArrowLeft"])
            {
                const keyEvent: KeyEvent = {player: 1, key: "Left", room: "chihaja"};
                socket.emit("keyEvent", keyEvent)
            }
            else if (activeKeys["ArrowUp"])
            {
                const keyEvent: KeyEvent = {player: 1, key: "Up", room: "chihaja"};
                socket.emit("keyEvent", keyEvent)
            }
        }
        else if (event.key === "a" && gameState === "gameStarted")
        {
            const keyEvent: KeyEvent = {player: 1, key: "A", room: "chihaja"};
            socket.emit("keyEvent", keyEvent)
        }
        else if (event.key === "d" && gameState === "gameStarted")
        {
            const keyEvent: KeyEvent = {player: 1, key: "D", room: "chihaja"};
            socket.emit("keyEvent", keyEvent)
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', (event) => { delete activeKeys[event.key] });
		return () => {
		    window.removeEventListener('keydown', handleKeyDown);
		};
    }, [])
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
