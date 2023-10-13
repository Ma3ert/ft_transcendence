import React, { useEffect, useContext } from "react";
import { Grid, GridItem, Stack, Button, Text } from "@chakra-ui/react";
import ChatBox from "../ChatComponents/chatBox";
import ChatNavigation from "../ChatComponents/ChatNavigation";
import ChannelSettings from "../ChatComponents/ChannelSettings";
import EventListener from "../../../utils/EventListener";
import { GlobalContext, ChatContext, UsersContext } from "@/context/Contexts";
import { CHANNEL, PRIVATE } from "../../../contstants";
import PrivateChat from "./PrivateChat";
import ChannelsChat from "./ChannelsChat";
import { NotifyServer } from "../../../utils/eventEmitter";
import useDirectConversations from "@/hooks/useDirectConversations";
import NoFriendsPage from "./NoFriendsPage";
const ChatInterface: React.FC = ({}) => {
  const { chatType } = useContext(ChatContext);
  const { socket } = useContext(GlobalContext);
  const { loggedInUser, friendsList } = useContext(UsersContext);
  const { data, isLoading, isError } = useDirectConversations();

  useEffect(() => {
    const type = chatType == CHANNEL ? "channelMessage" : "directMessage";
    console.log(type);
    if (chatType == PRIVATE)
      NotifyServer(socket!, "userIsActive", loggedInUser!);
  }, []);
  return (
    <Stack h="100%" w="100%" justifyContent={"center"}>
      {(friendsList && friendsList.length > 0) ? (
        chatType == PRIVATE ? (
          <PrivateChat />
        ) : (
          <ChannelsChat />
        )
      ) : (
        <NoFriendsPage />
      )}
    </Stack>
  );
};

export default ChatInterface;
