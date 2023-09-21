import { Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

type Props = {
    w: string;
    h: string;
    x: number;
    y: number;
    src: string
}

const SecondRaquette = ({w, h, x, y, src}: Props) => {
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

export default SecondRaquette
