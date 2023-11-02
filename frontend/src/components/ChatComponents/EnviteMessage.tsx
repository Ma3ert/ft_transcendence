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
import UserAvatar from "../UserAvatar";
import { useRouter } from "next/navigation";
interface EnviteMessageProps {
  gameInviteSender?: string;
}
const EnviteMessage: React.FC<EnviteMessageProps> = ({}) => {
  const { gameInviteSender } = useContext(UsersContext);
  const { activePeer, onClose, friendsList } = useContext(UsersContext);
  const { currentUser } = useAuth();
  const router = useRouter();
  const Peer = friendsList?.find((item) => item.id === gameInviteSender);
  const toast = useToast();
  const {setInviteStatus, inviteTogameId} = useContext (UsersContext)

  useEffect(() => {
    // Create a setTimeout to change the message after 3 seconds
    const timerId = setTimeout(() => {
      onClose!();
      setInviteStatus! (false);
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
        minW={"360px"}
        maxW="100%"
        px={5}
        py={5}
        w="auto"
        h="auto"
        spacing={5}
      >
        <HStack spacing={5} justifyContent={"center"} alignItems={"center"}>
         <UserAvatar user={Peer} size="lg"/>
          <Stack justify={"center"} alignItems={"center"} p={2}>
            <Text
              fontFamily="visbyRound"
              color={
                gameInviteSender !== currentUser!.user!.id
                  ? "#5B6171"
                  : "#1D222C"
              }
              fontSize={"md"}
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
                    socket?.emit('gameAcceptInvite', { invite: inviteTogameId})
                    !toast.isActive("set") &&
                      toast({
                        id: "set",
                        title: "Setting up the game...",
                        status: "info",
                      });
                      router.push("/Game");
                    onClose!();
                    setInviteStatus! (false);
                  }}
                  variant={
                    gameInviteSender !== currentUser!.user!.id
                      ? "lightGray"
                      : "darkGray"
                  }
                  fontSize="16px"
                >
                  {`let's go`}
                </Button>
              )}
              <Button
                color={"#DC585B"}
                variant={"ghost"}
                onClick={() =>{
                  setInviteStatus! (false);
                  onClose!()}}
                fontSize="16px"
                padding="6px 12px"
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
