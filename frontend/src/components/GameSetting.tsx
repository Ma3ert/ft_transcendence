import ScrollableStack from "./ScrollableStack";
import {Button, Wrap, Stack, Text, Box, Flex, Spacer} from "@chakra-ui/react"
import Cookies from "js-cookie"

export const GameSeting = () => {
    <Stack fontFamily={"visbyRound"} direction="column" align="center" justify="center">
        <Text fontSize={"20px"}>Choose the theme for the game</Text>
        <ScrollableStack>
            <Button onClick={() => {Cookies.set("theme", JSON.stringify({one: "#252932", two: "#5B6171", ball: "#DC585B"}))}} w={"80%"} h={{ base: "100px", lg: "150px" }} variant={"field"} alignItems={"center"} alignContent={"center"}>
                <Stack direction="column" align="center" justify="center" spacing={"8px"}>
                    <Text fontSize={"15px"}>Main theme</Text>
                    <Flex alignItems={"center"} width={"full"}>
                        <Box
                            w={{ base: "20px", lg: "30px" }}
                            h={{ base: "50px", lg: "60px" }}
                            borderRadius={"20px"}
                            bg={"#d9d9d9"}/>
                        <Spacer/>
                        <Box boxSize={"20px"} bg={"#d9d9d9"} borderRadius={"full"}/>
                        <Spacer/>
                        <Box
                            w={{ base: "20px", lg: "30px" }}
                            h={{ base: "50px", lg: "60px" }}
                            borderRadius={"20px"}
                            bg={"#DC585B"}/>
                    </Flex>
                </Stack>
            </Button>
            <Button onClick={() => {Cookies.set("theme",  JSON.stringify({one: "#D9D9D9", two: "#DC585B", ball: "#D9D9D9"}))}} w={"80%"} h={{ base: "100px", lg: "150px" }} variant={"field"} alignItems={"center"} alignContent={"center"}>
                <Stack direction="column" align="center" justify="center" spacing={"8px"}>
                    <Text fontSize={"15px"}>Secondary theme</Text>
                    <Flex alignItems={"center"} width={"full"}>
                        <Box
                            w={{ base: "20px", lg: "30px" }}
                            h={{ base: "50px", lg: "60px" }}
                            borderRadius={"20px"}
                            bg={"#1D222C"}/>
                        <Spacer/>
                        <Box boxSize={"20px"} bg={"#DC585B"} borderRadius={"full"}/>
                        <Spacer/>
                        <Box
                            w={{ base: "20px", lg: "30px" }}
                            h={{ base: "50px", lg: "60px" }}
                            borderRadius={"20px"}
                            bg={"#5B6171"}/>
                    </Flex>
                </Stack>
            </Button>
        </ScrollableStack>
    </Stack>
}