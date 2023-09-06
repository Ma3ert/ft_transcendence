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
  const [isPrivateChat, setIsPrivateChat] = useState(false)


    return (<Stack justify={'center'} alignItems={'center'} w='100%' h='100%'>
    <ChatLobbyToggler action={setIsPrivateChat} />
    <HStack w='100%' h='100%'  justify={'space-around'} alignItems={'center'}>
      <Stack justify='start' alignItems={'center'}  w={'20%'} h='100%' >
        <ChannelToggler />
        <FriendsList friends={friendsList} />
      </Stack>
      <Box flex={1}  h='100%'>
        {
          isPrivateChat ? <ChannelChat isPrivateChat={isPrivateChat} Peer={friendsList[0]} /> : <ChannelChat isPrivateChat={isPrivateChat} Channel={Channels[0]} />
        }
      </Box>
      <Box h='100%' w='25%'>
        {isPrivateChat ? '' : <ChannelSettings />}
      </Box>
    </HStack>
  </Stack>)
}


export default ChatSection;