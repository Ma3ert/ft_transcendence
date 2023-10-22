import { useAuth } from '@/hooks/useAuth'
import { Stack, Text, Wrap, Progress } from '@chakra-ui/react'
import React from 'react'

type Props = {
}

const ProgressLevel = (props: Props) => {
  const {currentUser, updateUser} = useAuth()
  return (
    <Stack marginTop={"12px"} align={"center"} w={{base: "260px", xl: "360px" }} h={{ base: "150px", xl: "150px" }} fontFamily={"visbyRound"}>
        <Wrap spacingX={"12px"} align={"baseline"}>
            <Text color={"#5B6171"} fontSize={{ base: "35px", xl: "40px" }}>LEVEL</Text>
            <Text color={"#D9D9D9"} fontSize={{ base: "50px", xl: "60px" }}>{currentUser.level}</Text>
        </Wrap>
        <Text color={"#5B6171"} fontSize={{base: "15px", xl: "20px" }}>{currentUser.xp + "xp"}</Text>
    </Stack>
  )
}

export default ProgressLevel