import React, { useContext, useEffect } from "react";
import { ChatContext, UsersContext } from "@/context/Contexts";
import { HStack, Stack, Text, Image, Button, Progress } from "@chakra-ui/react";
import { loggedIndUser } from "../../../contstants";
import TimerComponent from "./TimerComponent";
interface EnviteMessageProps {
  gameInviteSender?: string;
}
const EnviteMessage: React.FC<EnviteMessageProps> = ({}) => {
  const { joinGameStatus, setJoinGameStatus, gameInviteSender } =
    useContext(ChatContext);
  const { activePeer, loggedInUser } = useContext(UsersContext);

  useEffect(() => {
    // Create a setTimeout to change the message after 3 seconds
    const timerId = setTimeout(() => {
      setJoinGameStatus!(false);
    }, 15000); // 3000 milliseconds (3 seconds)

    // Clean up the timer when the component unmounts or when needed
    return () => clearTimeout(timerId);
  }, []);
  return (
    <HStack
      justify={gameInviteSender !== loggedIndUser.id ? "end" : "start"}
      w="98%"
      mx="auto"
      spacing={3}
    >
      <Stack
        borderRadius={"2xl"}
        bg={gameInviteSender !== loggedIndUser.id ? "#252932" : "#5B6171"}
        minW={"300px"}
        maxW="100%"
        px={2}
        py={2}
        w="auto"
        h="auto"
        spacing={5}
      >
        <HStack spacing={5}>
          <Image
            src={
              gameInviteSender !== loggedIndUser.id
                ? "/LightSolidLogo.png"
                : "/DarkSolidLogo.png"
            }
            alt={"envite"}
            w={8}
            h={"auto"}
          />
          <Stack justify={"center"} alignItems={"center"} p={2}>
            <Text
              color={
                gameInviteSender !== loggedIndUser.id ? "#5B6171" : "#1D222C"
              }
              fontSize={"sm"}
              fontWeight={"bold"}
            >
              {gameInviteSender !== loggedIndUser.id
                ? activePeer!.username
                : "you"}{" "}
              Looking for a 1v1 ..
            </Text>
            <Button
              isDisabled={gameInviteSender === loggedIndUser.id}
              onClick={() => {
                /// accept game invite
                /// decline game inviate
                setJoinGameStatus!(false);
              }}
              variant={
                gameInviteSender !== loggedIndUser.id ? "lightGray" : "darkGray"
              }
            >
              {`let's go`}
            </Button>
          </Stack>
        </HStack>
      <TimerComponent bg={gameInviteSender !== loggedIndUser.id ? "#5B6171" : "#1D222C"}/>
      </Stack>
    </HStack>
  );
};
export default EnviteMessage;
