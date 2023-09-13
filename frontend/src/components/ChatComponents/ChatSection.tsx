import React, { useState } from "react";
import { Box, HStack, Stack } from "@chakra-ui/react";
import ChannelChat from "@/components/ChatComponents/ChannelChat";
import ChannelSettings from "@/components/ChatComponents/ChannelSettings";
import FriendsList from "@/components/ChatComponents/FriendsList";
import { friendsList, Channels } from "../../../contstants";
interface ChatSectionProps{}

const ChatSection:React.FC<ChatSectionProps> = ({})=>{


    return (
      <HStack justify={'center'}  spacing={8} alignItems={'start'} w='100%' h='100%' p={2} >
        <Stack  alignItems={'center'}>
          <FriendsList friends={friendsList}/>
        </Stack>
        <ChannelChat isPrivateChat={true} Peer={friendsList[0]}/>
        <ChannelSettings/>
      </HStack>
    )
}


export default ChatSection;