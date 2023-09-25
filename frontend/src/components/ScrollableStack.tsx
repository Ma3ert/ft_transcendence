import { Box, Stack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import "../theme/styles.css" 

type Props = {
  width: number;
  height: number;
  items: ReactNode[];
  spacing: string;
}

const ScrollableStack = ({ width, height, spacing, items }: Props) => {
  return (
    <Box
      fontFamily={"visbyRound"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      w={(width + 20).toString() + "px"}
      h={(height + 50).toString() + "px"}
      borderRadius={"20px"}
      maxH={'65vh'}
      bg={"#1D222C"}>
      <Box
        className='customScroll'
        maxH={'95%'}
        overflowY={"scroll"}
        w={width.toString() + "px"}
        h={height.toString() + "px"}>
        <Stack align={"center"} spacing={spacing}>
          {items.map((item) => (item))}
        </Stack>
      </Box>
    </Box>
  )
}

export default ScrollableStack