import React, { useContext, useEffect } from "react";
import { ChatContext, UsersContext } from "@/context/Contexts";
import {
  HStack,
  Stack,
  Text,
  Image,
  Button,
  Progress,
  useToast,
} from "@chakra-ui/react";
import TimerComponent from "./TimerComponent";
import { useAuth } from "@/hooks/useAuth";
import socket from "../GameComponents/socket";
interface EnviteMessageProps {
  gameInviteSender?: string;
}
const EnviteMessage: React.FC<EnviteMessageProps> = ({}) => {
  const { setJoinGameStatus } = useContext(ChatContext);
  const { gameInviteSender } = useContext(UsersContext);
  const { activePeer, onClose, friendsList } = useContext(UsersContext);
  const { currentUser } = useAuth();
  const Peer = friendsList?.find((item) => item.id === gameInviteSender);
  const toast = useToast();

  useEffect(() => {
    // Create a setTimeout to change the message after 3 seconds
    const timerId = setTimeout(() => {
      onClose!();
    }, 15000); // 3000 milliseconds (3 seconds)

    // Clean up the timer when the component unmounts or when needed
    return () => clearTimeout(timerId);
  }, []);
  return (
    <HStack
      justify={gameInviteSender !== currentUser!.user!.id ? "end" : "start"}
      w="98%"
      mx="auto"
      spacing={3}
    >
      <Stack
        borderRadius={"2xl"}
        bg={gameInviteSender !== currentUser!.user!.id ? "#252932" : "#5B6171"}
        minW={"300px"}
        maxW="100%"
        px={2}
        py={2}
        w="auto"
        h="auto"
        spacing={5}
      >
        <HStack spacing={5} justifyContent={"center"} alignItems={"center"}>
          <Image
            src={
              gameInviteSender !== currentUser!.user!.id
                ? "/LightSolidLogo.png"
                : "/DarkSolidLogo.png"
            }
            alt={"envite"}
            w={8}
            h={"auto"}
          />
          <Stack justify={"center"} alignItems={"center"} p={2}>
            <Text
              fontFamily="visbyRound"
              color={
                gameInviteSender !== currentUser!.user!.id
                  ? "#5B6171"
                  : "#1D222C"
              }
              fontSize={"sm"}
              fontWeight={"bold"}
            >
              {gameInviteSender !== currentUser!.user!.id
                ? Peer!.username || "a friend"
                : "you"}{" "}
              Looking for a 1v1 ..
            </Text>
            <HStack spacing={4}>
              {gameInviteSender !== currentUser!.user!.id && (
                <Button
                  onClick={() => {
                    /// accept game invite
                    /// decline game inviate
                    // setJoinGameStatus!(false);
                    !toast.isActive("set") &&
                      toast({
                        id: "set",
                        title: "setting up the game ...",
                        status: "info",
                      });
                    onClose!();
                    socket && socket.emit("gameJoinQueue");
                  }}
                  variant={
                    gameInviteSender !== currentUser!.user!.id
                      ? "lightGray"
                      : "darkGray"
                  }
                >
                  {`let's go`}
                </Button>
              )}
              <Button
                color={"#DC585B"}
                variant={"ghost"}
                onClick={() => onClose!()}
              >
                decline
              </Button>
            </HStack>
          </Stack>
        </HStack>
        <TimerComponent
          bg={
            gameInviteSender !== currentUser!.user!.id ? "#5B6171" : "#1D222C"
          }
        />
      </Stack>
    </HStack>
  );
};
export default EnviteMessage;
