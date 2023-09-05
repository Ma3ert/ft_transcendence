import { Icon, Image, Stack, Text } from '@chakra-ui/react'
import {FaAngleDown } from "react-icons/fa"
import React from 'react'

type Props = {}

const SoloLobbyParty = (props: Props) => {
  return (
    <Stack align={"center"} spacing={"10px"}>
        <Stack spacing={"1px"} align={"center"} fontFamily={"visbyRound"}>
            <Text color={"#5B6171"} fontSize={"12px"}>you login</Text>
            <Text color={"#5B6171"} fontSize={"12px"}>state</Text>
            <Icon color={"#5B6171"} as={FaAngleDown} boxSize={"25px"}></Icon>
        </Stack>
        <Image src='/firstRaquetteNoSh.png' w={"298px"} h={"362px"}></Image>
    </Stack>
  )
}

export default SoloLobbyParty