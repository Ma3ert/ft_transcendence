import React, { useEffect, useRef, useState } from 'react'
import { Stack, Text, HStack } from "@chakra-ui/react";
import { friendsList, messages } from "../../../contstants";
import MessageStack from "./MessageStack";
import ChatInputBox from "./ChatInputBox";
import { Avatar } from "@chakra-ui/react";
import FriendSettingsMenu from "./FriendSettingsMenu";
interface ChannelChatProps {
  isPrivateChat: boolean;
  Channel?: Channel;
  Peer?: User;
}
const ChannelChat: React.FC<ChannelChatProps> = ({
  isPrivateChat,
  Channel,
  Peer,
}) => {
  
  return (
    <Stack
      borderRadius={"2xl"}
      bg="#1D222C"
      justify={"space-between"}
      alignItems={"center"}
      py={2}
      maxW={{base:'100%', sm:'300px', md:'400px', lg:'600px', xl:'800px'}} 
      maxH={'100%'}
      h={'100%'}
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
        <HStack spacing={4} alignItems="center">
          <Avatar src={Peer?.imageUrl} name={Peer?.username} size="sm" />
          <Text fontWeight={"bold"} fontSize={"sm"} color="#5B6171">
            {Peer?.username}
          </Text>
        </HStack>
        {isPrivateChat && <FriendSettingsMenu user={Peer!} />}
      </HStack>
        <MessageStack messages={messages}  />
      <Stack w={"100%"} alignItems={"center"}>
        <ChatInputBox />
      </Stack>
    </Stack>
  );
};

export default ChannelChat;
