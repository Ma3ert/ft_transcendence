import React, { useState } from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import ChannelChat from "@/components/ChatComponents/ChannelChat";
import ChannelSettings from "@/components/ChatComponents/ChannelSettings";
import ChannelToggler from "@/components/ChatComponents/ChannelToggler";
import ChatLobbyToggler from "@/components/ChatComponents/ChatLobbyToggler";
import FriendsList from "@/components/ChatComponents/FriendsList";
import { friendsList, Channels } from "../../../contstants";
interface ChatSectionProps{}

const ChatSection:React.FC<ChatSectionProps> = ({})=>{


    return (<div>
      chat section
    </div>)
}


export default ChatSection;