import { useAuth } from '@/hooks/useAuth'
import { Stack, Text, Wrap, Progress } from '@chakra-ui/react'
import React from 'react'

type Props = {
}

const ProgressLevel = (props: Props) => {
  const {currentUser, updateUser} = useAuth()
  return (
    <Stack align={"start"} w={{base: "260px", xl: "360px" }} h={{ base: "150px", xl: "150px" }} fontFamily={"visbyRound"}>
        <Wrap spacing={"12px"} align={"baseline"}>
            <Text color={"#5B6171"} fontSize={{ base: "35px", xl: "40px" }}>LEVEL</Text>
            <Text color={"#D9D9D9"} fontSize={{ base: "50px", xl: "60px" }}>{currentUser.level}</Text>
        </Wrap>
        <Progress
          bg={"#DC585B"}
          h={{ base: "8px", xl: "10px" }} w={"90%"}
          value={50}
          borderRadius={"full"}></Progress>
        <Text color={"#5B6171"} fontSize={{base: "10px", xl: "15px" }}>{currentUser.xp + "xp/" + "20000" + "xp"}</Text>
    </Stack>
  )
}

export default ProgressLevel