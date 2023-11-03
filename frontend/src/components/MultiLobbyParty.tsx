import { Avatar, Icon, Image, Stack, Text, Wrap } from '@chakra-ui/react'
import {FaAngleDown } from "react-icons/fa"
import React from 'react'

type Props = {
    avatar: string;
    username: string;
    ready: boolean;
    other: string;
    otherReady: boolean;
    otherAvatar: string;
    alone: boolean;
}

const MultiLobbyParty = ({username, ready, other, otherReady, alone, avatar, otherAvatar}: Props) => {
  return (
    <Wrap align={"center"}>
        <Stack align={"center"} spacing={"10px"} style={{ position: 'absolute', zIndex: 1 }} >
            <Stack spacing={"1px"} align={"center"} fontFamily={"visbyRound"}>
                <Avatar boxSize={{base: "40px", xl: "65px" }} name={username} src={avatar.includes("http") ? avatar : "http://e1r9p5.1337.ma:3000/public/users/imgs/" + avatar} border="1px solid #D9D9D9" marginBottom={2} style={{backgroundColor: '#5B6171', fontSize:'15px'}} />
                <Text color={"#5B6171"} fontSize={{base: "8px", xl: "12px"}}>{username}</Text>
                <Text color={"#5B6171"} fontSize={{base: "8px", xl: "12px"}}>{ready ? "ready" : "not ready"}</Text>
                <Icon color={"#5B6171"} as={FaAngleDown} boxSize={{base: "15px", xl: "25px" }}></Icon>
            </Stack>
            <Image src='/firstRaquette.png' w={{base: "200px", lg: "280px", "2xl": "390px" }} h={"auto"}></Image>
        </Stack>
        <Stack align={"center"} spacing={"10px"} style={{ position: 'relative', zIndex: 0 }} marginLeft={{ base: "90px", lg: "130px", "2xl": "180px" }}>
            <Stack spacing={"1px"} align={"center"} fontFamily={"visbyRound"}>
                <Avatar boxSize={{base: "40px", xl: "65px" }} name={other} src={otherAvatar.includes("http") ? otherAvatar : "http://e1r9p5.1337.ma:3000/public/users/imgs/" + otherAvatar} border="1px solid #D9D9D9" marginBottom={2} style={{backgroundColor: '#5B6171', fontSize: '15px'}}  />
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