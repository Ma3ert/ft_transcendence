import { Icon, Image, Stack, Text, Wrap } from '@chakra-ui/react'
import {FaAngleDown } from "react-icons/fa"
import React from 'react'

type Props = {}

const MultiLobbyParty = (props: Props) => {
  return (
    <Wrap align={"center"}>
        <Stack align={"center"} spacing={"10px"} style={{ position: 'absolute', zIndex: 1 }} >
            <Stack spacing={"1px"} align={"center"} fontFamily={"visbyRound"}>
                <Text color={"#5B6171"} fontSize={{base: "8px", xl: "12px"}}>you login</Text>
                <Text color={"#5B6171"} fontSize={{base: "8px", xl: "12px"}}>state</Text>
                <Icon color={"#5B6171"} as={FaAngleDown} boxSize={{base: "15px", xl: "25px" }}></Icon>
            </Stack>
            <Image src='/firstRaquette.png' w={{base: "290px", lg: "339px", "2xl": "390px" }} h={{ base: "357px", lg: "413px", "2xl":"474px" }}></Image>
        </Stack>
        <Stack align={"center"} spacing={"10px"} style={{ position: 'relative', zIndex: 0 }} marginLeft={{ base: "150px", xl: "180px" }}>
            <Stack spacing={"1px"} align={"center"} fontFamily={"visbyRound"}>
                <Text color={"#5B6171"} fontSize={{base: "8px", xl: "12px"}}>other login</Text>
                <Text color={"#5B6171"} fontSize={{base: "8px", xl: "12px"}}>state</Text>
                <Icon color={"#5B6171"} as={FaAngleDown} boxSize={{base: "15px", xl: "25px" }}></Icon>
            </Stack>
            <Image src='/secondRaquette.png' w={{base: "290px", lg: "339px", "2xl": "390px" }} h={{ base: "357px", lg: "413px", "2xl":"474px" }}></Image>
        </Stack>
    </Wrap>
  )
}

export default MultiLobbyParty