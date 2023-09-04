import { Stack, Text, Wrap, Progress } from '@chakra-ui/react'
import React from 'react'

type Props = {
}

const ProgressLevel = (props: Props) => {
  return (
    <Stack align={"start"} w={"360px"} h={"150px"} fontFamily={"visbyRound"}>
        <Wrap spacing={"12px"} align={"baseline"}>
            <Text color={"#5B6171"} fontSize={"40px"}>LEVEL</Text>
            <Text color={"#D9D9D9"} fontSize={"60px"}>11</Text>
        </Wrap>
        <Progress
          bg={"#DC585B"}
          h={"10px"} w={"100%"}
          value={50}
          borderRadius={"full"}></Progress>
        <Text color={"#5B6171"} fontSize={"15px"}>{"10000" + "xp/" + "20000" + "xp"}</Text>
    </Stack>
  )
}

export default ProgressLevel