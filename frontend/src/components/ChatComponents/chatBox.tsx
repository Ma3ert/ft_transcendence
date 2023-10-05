import React, { useEffect, useRef, useState, useContext } from "react";
import { Stack, Text, HStack } from "@chakra-ui/react";
import { loggedIndUser, messages } from "../../../contstants";
import MessageStack from "./MessageStack";
import ChatInputBox from "./ChatInputBox";
import { Avatar } from "@chakra-ui/react";
import FriendSettingsMenu from "./FriendSettingsMenu";
import { ChatContext, UsersContext } from "../../context/Contexts";
import { PRIVATE } from "../../../contstants";
import { NotifyServer } from "../../../utils/eventEmitter";
import { GlobalContext } from "@/context/Contexts";
import EventListener from "../../../utils/EventListener";
import UserChannelHeader from "./UserChannelHeader";
import useEventHandler from "@/hooks/useEventHandler";
import useGameEnvite from "@/hooks/useGameEnvite";
import OptionsMenu from "./FriendSettingsMenu";

interface ChatBoxProps {}
const ChatBox: React.FC<ChatBoxProps> = ({}) => {
  const {
    activeChannel,
    Friends,
    chatType,
    setJoinGameStatus,
    directMessages,
    setDirectMessages,
    GameEnvitation,
    setGameEnvitation,
  } = useContext(ChatContext);
  const {activePeer, setActivePeer} = useContext (UsersContext)
  const { socket } = useContext(GlobalContext);
  const listener = useEventHandler(socket);
  const gameEnviteHandler = useGameEnvite();
  // const privateMessageHandler = usePrivateMessage ()
  // const channelMessageHandler = useChannelMessage ()

  useEffect(() => {
    // if direct messaeges fetch active peer messages
    // if channel fetch channel messages
    console.log(`activePeer is ${activePeer?.username}`);
    // if (chatType == PRIVATE) {
    //   NotifyServer(socket!, "checkStatus", activePeer!);
    //   NotifyServer(socket!, "readChatNotification",activePeer!,  false);
    //   EventListener(socket!, "checkStatus", (msg: any) => {
    //     // set peer status
    //     console.log(`${msg} from server`);
    //   });

    //   listener("directMessage", (message: EventMessage) => {
    //     if (message.game)
    //       console.log("game envitation");
    //       // gameEnviteHandler(message.from, message.to)
    //     else setDirectMessages!([...directMessages!, message]);
    //   });
    // } else {
    // NotifyServer(socket!, "readChatNotification", activePeer!, true, activeChannel!);

    // }
  }, [directMessages, activePeer, activeChannel, chatType]);
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
        {chatType == PRIVATE && <OptionsMenu color='#5B6171' user={activePeer!} />}
      </HStack>
      <MessageStack />
      <Stack w={"100%"} alignItems={"center"}>
        <ChatInputBox />
      </Stack>
    </Stack>
  );
};

export default ChatBox;
