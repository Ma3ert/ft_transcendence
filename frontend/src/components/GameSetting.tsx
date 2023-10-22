import ScrollableStack from "./ScrollableStack";
import {Button, Wrap, Stack, Text, Box, Flex, Spacer, useToast} from "@chakra-ui/react"
import Cookies from "js-cookie"

export const GameSetting = ({}) => {
    const toast = useToast()
    const setCookie = (object: any) => 
    {
        Cookies.set("theme",  JSON.stringify(object));
        !toast.isActive("theme") && toast({
            title: "Theme is set",
            id: "theme",
            status: "success"
        })
    }
    return (

    <Stack fontFamily={"visbyRound"} direction="column" align="center" justify="center">
        <Text color={"#d9d9d9"} fontSize={"20px"}>Choose the theme for the game</Text>
        <ScrollableStack>
            <Button onClick={() => {setCookie({one: "#D9D9D9", two: "#DC585B", ball: "#D9D9D9"})}} w={"80%"} h={{ base: "100px", lg: "150px" }} variant={"field"} alignItems={"center"} alignContent={"center"}>
                <Stack direction="column" align="center" justify="center" spacing={"8px"} w={"60%"}>
                    <Text fontSize={"15px"}>Main theme</Text>
                    <Flex alignItems={"center"} width={"full"}>
                        <Box
                            w={{ base: "15px", lg: "20px" }}
                            h={{ base: "50px", lg: "60px" }}
                            borderRadius={"20px"}
                            bg={"#d9d9d9"}/>
                        <Spacer/>
                        <Box boxSize={"20px"} bg={"#d9d9d9"} borderRadius={"full"}/>
                        <Spacer/>
                        <Box
                            w={{ base: "15px", lg: "20px" }}
                            h={{ base: "50px", lg: "60px" }}
                            borderRadius={"20px"}
                            bg={"#DC585B"}/>
                    </Flex>
                </Stack>
            </Button>
            <Button onClick={() => setCookie({one: "#181D25", two: "#5B6171", ball: "#DC585B"})} w={"80%"} h={{ base: "100px", lg: "150px" }} variant={"field"} alignItems={"center"} alignContent={"center"}>
                <Stack direction="column" align="center" justify="center" spacing={"8px"} w={"60%"}>
                    <Text fontSize={"15px"}>Secondary theme</Text>
                    <Flex alignItems={"center"} width={"full"}>
                        <Box
                            w={{ base: "15px", lg: "20px" }}
                            h={{ base: "50px", lg: "60px" }}
                            borderRadius={"20px"}
                            bg={"#1D222C"}/>
                        <Spacer/>
                        <Box boxSize={"20px"} bg={"#DC585B"} borderRadius={"full"}/>
                        <Spacer/>
                        <Box
                            w={{ base: "15px", lg: "20px" }}
                            h={{ base: "50px", lg: "60px" }}
                            borderRadius={"20px"}
                            bg={"#5B6171"}/>
                    </Flex>
                </Stack>
            </Button>
        </ScrollableStack>
    </Stack>
    )  
}