import React, { useEffect, useRef, useState, useContext } from "react";
import { Stack, Text, HStack } from "@chakra-ui/react";
import { loggedIndUser, messages } from "../../../contstants";
import MessageStack from "./MessageStack";
import ChatInputBox from "./ChatInputBox";
import { Avatar } from "@chakra-ui/react";
import FriendSettingsMenu from "./FriendSettingsMenu";
import { ChatContext, UsersContext , DmContext, ChannelsContext, CmContext} from "../../context/Contexts";
import { PRIVATE } from "../../../contstants";
import { NotifyServer } from "../../../utils/eventEmitter";
import { GlobalContext } from "@/context/Contexts";
import EventListener from "../../../utils/EventListener";
import UserChannelHeader from "./UserChannelHeader";
import useEventHandler from "@/hooks/useEventHandler";
import useGameEnvite from "@/hooks/useGameEnvite";
import OptionsMenu from "./FriendSettingsMenu";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface ChatBoxProps {}
const ChatBox: React.FC<ChatBoxProps> = ({}) => {
  const {
    Friends,
    chatType,
    setJoinGameStatus,
    setDirectMessages,
    GameEnvitation,
    setGameEnvitation,
  } = useContext(ChatContext);
  const {activePeer, setActivePeer} = useContext (UsersContext)
  const { socket } = useContext(GlobalContext);
  const listener = useEventHandler(socket);
  const gameEnviteHandler = useGameEnvite();
  const {activeChannel} = useContext (ChannelsContext)
  const {messages, setChannelMessages} = useContext (CmContext)
  const [counter, setCounter] = useState (0)
  const {currentUser} = useAuth ()
  const router = useRouter ()

  if (currentUser  === undefined || !socket)
    router.push ('/')

  const getReadChatNotification = () => {
    if (chatType == PRIVATE) {
      return {
        channel:false,
        id: activePeer!.id,
      }
    }
    return {
      channel: true,
      id: activeChannel!.id,
    };
    }
    useEffect (()=>{

      if (socket)
        socket!.emit ('readChatNotification', getReadChatNotification())
    }, [])
  return (
    <Stack
      borderRadius={"2xl"}
      w={"98%"}
      h="98%"
      maxH="72vh"
      maxW={"850px"}
      mx={"auto"}
      bg="#1D222C"
      justify={"space-between"}
      alignItems={"center"}
      py={2}
    >
      <HStack
        borderRadius={"2xl"}
        bg="#252932"
        justify={"space-between"}
        alignItems={"center"}
        w="98%"
        px={4}
        py={2}
      >
        <UserChannelHeader status={"online"} />
        {chatType == PRIVATE && <OptionsMenu  user={activePeer!} />}
      </HStack>
      <MessageStack />
      <Stack w={"100%"} alignItems={"center"}>
        <ChatInputBox />
      </Stack>
    </Stack>
  );
};

export default ChatBox;
