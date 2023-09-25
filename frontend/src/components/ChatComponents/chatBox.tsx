import React, { useEffect, useRef, useState, useContext } from "react";
import { Stack, Text, HStack } from "@chakra-ui/react";
import { friendsList, messages } from "../../../contstants";
import MessageStack from "./MessageStack";
import ChatInputBox from "./ChatInputBox";
import { Avatar } from "@chakra-ui/react";
import FriendSettingsMenu from "./FriendSettingsMenu";
import { ChatContext } from "../../context/Contexts";
import { PRIVATE } from "../../../contstants";

interface ChatBoxProps {}
const ChatBox: React.FC<ChatBoxProps> = ({}) => {
  const { activeChannel, activePeer, chatType } = useContext(ChatContext);
  return (
    <Stack
      borderRadius={"2xl"}
      w={"98%"}
      h="98%"
      maxH="72vh"
      maxW={'850px'}
      mx={'auto'}
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
        <HStack spacing={4} alignItems="center">
          <Avatar
            src={
              chatType == PRIVATE
                ? activePeer?.imageUrl
                : activeChannel?.imageUrl
            }
            name={
              chatType == PRIVATE ? activePeer?.username : activeChannel?.name
            }
            size="sm"
          />
          <Text fontWeight={"bold"} fontSize={"sm"} color="#5B6171">
            {chatType == PRIVATE ? activePeer?.username : activeChannel?.name}
          </Text>
        </HStack>
        {chatType == PRIVATE && <FriendSettingsMenu user={activePeer!} />}
      </HStack>
      <MessageStack messages={messages} />
      <Stack w={"100%"} alignItems={"center"}>
        <ChatInputBox />
      </Stack>
    </Stack>
  );
};

export default ChatBox;
