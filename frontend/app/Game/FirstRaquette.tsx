import { Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Point } from './gameEngine';

type Props = {
    w: string;
    h: string;
    x: number;
    y: number;
    src: string;
    setxPosition:React.Dispatch<React.SetStateAction<number>>
}

const FirstRaquette = ({w, h, x, y, src, setxPosition}: Props) => {
    const activeKeys: Record<string, boolean> = {};
    console.log("the xCord: ", x)
    const handleKeyDown = (event: KeyboardEvent) => {
        activeKeys[event.key] = true
        if (event.key.includes("Arrow"))
        {
            console.log("if fires ", event.key)
            if (activeKeys["ArrowUp"] && activeKeys["ArrowLeft"])
                console.log("6");
                // setEvent(6)
            else if (activeKeys["ArrowUp"] && activeKeys["ArrowRight"])
                console.log("8");
                // setEvent(8)
            else if (activeKeys["ArrowRight"])
                console.log("9");
                // setEvent(9)
            else if (activeKeys["ArrowLeft"])
                console.log("5");
                // setEvent(5)
            else if (activeKeys["ArrowUp"])
                console.log("7");
                // setEvent(7)
        }
        else if (event.key === "a")
        {
            console.log("a")
            setxPosition(200)
        }
        else if (event.key === "d")
        {
            console.log("d")
            setxPosition(300)
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
