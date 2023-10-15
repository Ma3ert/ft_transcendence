import { Box, Text, Wrap } from '@chakra-ui/react'
import React from 'react'

type Props = {
    leftScore: number;
    rightScore: number;
    leftPlayer: string;
    rightPlayer: string;
}

const BoxScore = ({leftScore, leftPlayer, rightScore, rightPlayer}: Props) => {
  return (
    <Wrap align={'center'} spacing={"40px"} margin={"auto"}>
        <Text color={"#d9d9d9"} fontSize={"30px"}>{leftPlayer}</Text>
        <Wrap align={"center"} spacing={"10px"}>
            <Box w={"90px"} h={"100px"} bg={"#d9d9d9"} borderLeftRadius={"15px"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Text fontSize={"70px"} color={"#252932"} >{leftScore}</Text>
            </Box>
            <Box w={"90px"} h={"100px"} bg={"#DC585B"} borderRightRadius={"15px"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Text fontSize={"70px"} color={"#252932"} >{rightScore}</Text>
            </Box>
        </Wrap>
        <Text color={"#DC585B"} fontSize={"30px"}>{rightPlayer}</Text>
    </Wrap>
  )
}

export default BoxScore