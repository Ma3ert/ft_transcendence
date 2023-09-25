import React, { useEffect, useRef, useState, useContext } from "react";
import { Stack, Text, HStack } from "@chakra-ui/react";
import { friendsList, loggedIndUser, messages } from "../../../contstants";
import MessageStack from "./MessageStack";
import ChatInputBox from "./ChatInputBox";
import { Avatar } from "@chakra-ui/react";
import FriendSettingsMenu from "./FriendSettingsMenu";
import { ChatContext } from "../../context/Contexts";
import { PRIVATE } from "../../../contstants";
import { EmitNotification, NotifyServer } from "../../../utils/eventEmitter";
import { GlobalContext } from "@/context/Contexts";
import EventListener from "../../../utils/EventListener";
import UserChannelHeader from "./UserChannelHeader";

interface ChatBoxProps {}
const ChatBox: React.FC<ChatBoxProps> = ({}) => {
  const {
    activeChannel,
    activePeer,
    setActivePeer,
    Friends,
    chatType,
    setJoinGameStatus,
    directMessages,
    setDirectMessages,
    GameInvitation,
    setGameInvitation,
  } = useContext(ChatContext);
  const { socket } = useContext(GlobalContext);

  const handleGameMessage = (msg: DirectMessage) => {
    // if (msg.from != activePeer?.id)
    //   setActivePeer! (Friends!.find (friend => friend.id == msg.from)!);

    console.log(
      `active user id : ${activePeer!.id} sender id : ${
        msg.from
      } reciever id : ${msg.to}`
    );
    setJoinGameStatus!(true);
    setGameInvitation!({ from: msg.from!, to: msg.to! });
  };

  useEffect(() => {
    // if direct messaeges fetch active peer messages
    // if channel fetch channel messages
    console.log(`activePeer is ${activePeer?.username}`);
    if (chatType == PRIVATE) {
      NotifyServer(activePeer!, socket, "checkStatus");
      EmitNotification(socket, "readChatNotification", {
        channel: false,
        id: activePeer!.id,
      });
      EventListener(socket, "checkStatus", (msg: any) => {
        console.log(`${msg} from server`);
      });

      EventListener(socket, "directMessage", (msg: any) => {
        console.table(msg);
        if (msg.game) handleGameMessage(msg);
        else setDirectMessages!([...directMessages!, msg]);
      });
    } else {
      EmitNotification(socket, "readChatNotification", {
        channel: true,
        id: activeChannel!.id,
      });
    }
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
        <UserChannelHeader status={'online'} />
        {chatType == PRIVATE && <FriendSettingsMenu user={activePeer!} />}
      </HStack>
      <MessageStack />
      <Stack w={"100%"} alignItems={"center"}>
        <ChatInputBox />
      </Stack>
    </Stack>
  );
};

export default ChatBox;
