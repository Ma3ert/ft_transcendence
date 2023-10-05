import React, { useEffect, useContext } from "react";
import { Grid, GridItem, Stack, Button, Text } from "@chakra-ui/react";
import ChatBox from "../ChatComponents/chatBox";
import ChatNavigation from "../ChatComponents/ChatNavigation";
import ChannelSettings from "../ChatComponents/ChannelSettings";
import EventListener from "../../../utils/EventListener";
import { GlobalContext, ChatContext } from "@/context/Contexts";
import { CHANNEL, PRIVATE } from "../../../contstants";
import PrivateChat from "./PrivateChat";
import ChannelsChat from "./ChannelsChat";

const ChatInterface: React.FC = ({}) => {
  const { chatType } = useContext(ChatContext);
  useEffect (()=>{
      const type = chatType == CHANNEL ? "channelMessage" : "directMessage"
       console.log (type)
  }
  ,[])
  return (
    <>
    {(chatType == PRIVATE ? <PrivateChat /> : <ChannelsChat />)}
    </>
  );
};

export default ChatInterface;
