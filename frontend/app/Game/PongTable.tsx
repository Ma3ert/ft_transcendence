import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react'

type Props = {
  tableW: number;
  tableH: number;
  tableBg: string;
  children: ReactNode;
}

const PongTable = ({tableW, tableH, tableBg, children}: Props) => {
  return (
    <Box
      position={"relative"}
      w={tableW}
      h={tableH}
      bg={tableBg}
      borderRadius={"15px"}
    >
      {children}
    </Box>
  )
}

export default PongTable