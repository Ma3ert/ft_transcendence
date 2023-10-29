import ScrollableStack from "./ScrollableStack";
import {Button, Wrap, Stack, Text, Box, Flex, Spacer, useToast} from "@chakra-ui/react"
import Cookies from "js-cookie"
import { gameTheme } from "../../contstants";
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

    <Stack fontFamily={"visbyRound"} direction="column" align="center" justify="center" >
        <Text color={"#d9d9d9"} fontSize={"20px"}>Choose the theme for the game</Text>
        <ScrollableStack >
            {
                gameTheme.map((theme, index) => {
                    return (

                        <Button key={index} onClick={() => {setCookie(theme)}} w={"80%"} h={{ base: "100px", lg: "150px" }} variant={"field"} alignItems={"center"} alignContent={"center"}>
                            <Stack direction="column" align="center" justify="center" spacing={"8px"} w={"60%"}>
                                <Text fontSize={"15px"}>Main theme</Text>
                                <Flex alignItems={"center"} width={"full"}>
                                    <Box
                                        w={{ base: "15px", lg: "20px" }}
                                        h={{ base: "50px", lg: "60px" }}
                                        borderRadius={"20px"}
                                        bg={theme.one}
                                        border={theme.border ? "1px solid " + theme.two : ""}
                                    />
                                    <Spacer/>
                                    <Box boxSize={"20px"} bg={theme.ball} borderRadius={"full"}/>
                                    <Spacer/>
                                    <Box
                                        w={{ base: "15px", lg: "20px" }}
                                        h={{ base: "50px", lg: "60px" }}
                                        borderRadius={"20px"}
                                        bg={theme.two}
                                        border={theme.border ? "1px solid " + theme.one : ""}
                                    />
                                </Flex>
                            </Stack>
                        </Button>
                    )
                })
            }
        </ScrollableStack>
    </Stack>
    )  
}