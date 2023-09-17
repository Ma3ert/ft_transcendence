import { Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

type Props = {
    w: string;
    h: string;
    x: number;
    y: number;
    src: string
}

const FirstRaquette = ({w, h, x, y, src}: Props) => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "a")
        {
            // here i should send the new Position
        }
        else if (event.key === "d")
        {
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
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
