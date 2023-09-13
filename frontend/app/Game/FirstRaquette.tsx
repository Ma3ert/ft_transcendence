import { Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

type Props = {
    w: string;
    h: string;
    x: number;
    y: number;
    lenght: number
}

const FirstRaquette = ({w, h, x, y, lenght}: Props) => {
    const [xCord, SetX] = useState(x)
    const [yCord, SetY] = useState(y)
    const [src, setSrc] = useState("/leftFirstRaquette.png")
    const checkPosition = () => {
        if (xCord > x + lenght / 2)
        {
            setSrc("/rightFirstRaquette.png")
        }
        else if (xCord < x + lenght / 2)
            setSrc("/leftFirstRaquette.png")
    }
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft")
        {
            // here I should check for the boundary and i should send the postion of the
            // raquette to the server so that the other player can know where I am
            // also I have to check if the raquette is on the left side or the right side 
            // so that I can render the right one
            SetX(xCord - 10)
                checkPosition()
        }
        else if (event.key === "ArrowRight")
        {
            SetX(xCord + 10)
                checkPosition()
        }
        console.log("xCord ", xCord)
        console.log("yCord ", yCord)
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
		return () => {
		    window.removeEventListener('keydown', handleKeyDown);
		}; 
    }, [yCord, xCord])
  return (
    <Image
        position={"absolute"}
        src={src}
        w={w}
        h={h}
        top={yCord}
        left={xCord}
    >
    </Image>
  )
}

export default FirstRaquette
