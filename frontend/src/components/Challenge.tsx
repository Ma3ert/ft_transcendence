import { Stack, Wrap, Text, Progress } from "@chakra-ui/react"


interface Props {
  progress: string;
  base: string;
  description: string;
}

const Challenge = ({progress, base, description}: Props) => {
  return (
    <Stack w={"360px"} spacing={"15px"} align={"center"} >
      <Wrap w={"100%"} justify="space-between" align="center">
        <Text color={"#5B6171"}>{description}</Text>
        <Text color={"#5B6171"}>{progress.trim() + "/" + base.trim()}</Text>
      </Wrap>
      <Progress bg={"#5B6171"} colorScheme="#252932" h={"10px"} w={"100%"} value={50} borderRadius={"full"}></Progress>
    </Stack>
  )
}

export default Challenge