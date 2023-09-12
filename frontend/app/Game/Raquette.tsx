import { Image } from '@chakra-ui/react'
import React, { useEffect } from 'react'

type Props = {
    w: string;
    h: string;
    src: string;
    x: number;
    y: number
}

const Raquette = ({w, h, src, x, y}: Props) => {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft")
        {
            x
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
        src={src}
        w={w}
        h={h}
        top={y}
        left={x}
    >
    </Image>
  )
}

export default Raquette
