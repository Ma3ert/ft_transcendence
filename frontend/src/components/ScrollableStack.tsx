import { Box, Stack } from '@chakra-ui/react'
import React, { ReactNode } from 'react'
import "../theme/styles.css" 

type Props = {
  width: any;
  height: any;
  items: ReactNode[];
  spacing: any;
}

const ScrollableStack = ({ width, height, spacing, items }: Props) => {
  return (
    <Box
      fontFamily={"visbyRound"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      w={width}
      h={height}
      borderRadius={"20px"}
      maxH={'65vh'}
      bg={"#1D222C"}>
      <Box
        py={"10px"}
        className='customScroll'
        maxH={'95%'}
        overflowY={"scroll"}
        w={width}
        h={height}>
        <Stack align={"center"} spacing={spacing}>
          {items.map((item) => (item))}
        </Stack>
      </Box>
    </Box>
  )
}

export default ScrollableStack