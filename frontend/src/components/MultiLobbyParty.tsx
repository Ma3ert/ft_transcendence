import { Icon, Image, Stack, Text, Wrap } from '@chakra-ui/react'
import {FaAngleDown } from "react-icons/fa"
import React from 'react'

type Props = {
    username: string;
    ready: boolean;
    other: string;
    otherReady: boolean;
    alone: boolean;
}

const MultiLobbyParty = ({username, ready, other, otherReady, alone}: Props) => {
  return (
    <Wrap align={"center"}>
        <Stack align={"center"} spacing={"10px"} style={{ position: 'absolute', zIndex: 1 }} >
            <Stack spacing={"1px"} align={"center"} fontFamily={"visbyRound"}>
                <Text color={"#5B6171"} fontSize={{base: "8px", xl: "12px"}}>{username}</Text>
                <Text color={"#5B6171"} fontSize={{base: "8px", xl: "12px"}}>{ready ? "ready" : "not ready"}</Text>
                <Icon color={"#5B6171"} as={FaAngleDown} boxSize={{base: "15px", xl: "25px" }}></Icon>
            </Stack>
            <Image src='/firstRaquette.png' w={{base: "200px", lg: "280px", "2xl": "390px" }} h={"auto"}></Image>
        </Stack>
        <Stack align={"center"} spacing={"10px"} style={{ position: 'relative', zIndex: 0 }} marginLeft={{ base: "90px", lg: "130px", "2xl": "180px" }}>
            <Stack spacing={"1px"} align={"center"} fontFamily={"visbyRound"}>
                <Text color={"#5B6171"} fontSize={{base: "8px", xl: "12px"}}>{other}</Text>
                <Text color={"#5B6171"} fontSize={{base: "8px", xl: "12px"}}>{otherReady ? "ready" : "not ready"}</Text>
                <Icon color={"#5B6171"} as={FaAngleDown} boxSize={{base: "15px", xl: "25px" }}></Icon>
            </Stack>
            { alone
                ? <Image src='/secondRacketSh.png'  w={{base: "200px", lg: "280px", "2xl": "390px" }} h={"auto"}></Image>
                : <Image src='/secondRaquette.png' w={{base: "200px", lg: "280px", "2xl": "390px" }} h={"auto"}></Image>
            }
        </Stack>
    </Wrap>
  )
}

export default MultiLobbyParty