import React, { useState } from "react";
import { Box, HStack, Stack, Button } from "@chakra-ui/react";
import ChannelChat from "@/components/ChatComponents/ChannelChat";
import ChannelSettings from "@/components/ChatComponents/ChannelSettings";
import FriendsList from "@/components/ChatComponents/FriendsList";
import { friendsList, Channels } from "../../../contstants";
import NewChannelModal from "./NewChannel";
interface ChatSectionProps {}

const ChatSection: React.FC<ChatSectionProps> = ({}) => {
  return (
    <HStack
      justify={"center"}
      spacing={8}
      alignItems={"start"}
      w="100%"
      h="100%"
      p={2}
    >
      <Stack alignItems={"center"} w={"15%"} h={'100%'}>
        <FriendsList isForChannel={false} friends={friendsList} channels={Channels} />
      </Stack>
      <ChannelChat isPrivateChat={true} Peer={friendsList[0]} />
      <Stack justify={'end'} alignItems={"center"} w={"15%"} h='95%'>
        <NewChannelModal />
      </Stack>
    </HStack>
  );
};

export default ChatSection;
