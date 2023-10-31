import React, { useEffect, useContext } from "react";
import { Grid, GridItem, Stack, Button, Text } from "@chakra-ui/react";
import ChatBox from "../ChatComponents/chatBox";
import ChatNavigation from "../ChatComponents/ChatNavigation";
import ChannelSettings from "../ChatComponents/ChannelSettings";
import EventListener from "../../../utils/EventListener";
import { GlobalContext, ChatContext, UsersContext, DmContext, ChannelsContext } from "@/context/Contexts";
import { CHANNEL, PRIVATE } from "../../../contstants";
import PrivateChat from "./PrivateChat";
import ChannelsChat from "./ChannelsChat";
import { NotifyServer } from "../../../utils/eventEmitter";
import NoFriendsPage from "./NoFriendsPage";
import { useAuth } from "@/hooks/useAuth";
import CmProvider from "@/providers/CmProvider";
import DmProvider from "@/providers/DmProvider";
import { useState } from "react";
import useChannels from "@/hooks/useChannels";
import { isError } from "react-query";

const ChatInterface: React.FC = ({ }) => {
  const { chatType } = useContext(ChatContext);
  const { friendsList } = useContext(UsersContext);
  const { socket, counter, setCounter } = useContext(GlobalContext)
  const {data:Channels, isError, isLoading} = useChannels ()
  const [userChannels, setUsersChannels] = useState<Channel[]> ([])
  const {activeChannel, setActiveChannel} = useContext (ChannelsContext)




  useEffect(() => {
    console.log ('here channels')
    console.table (Channels)
    setUsersChannels (Channels!)
    if (activeChannel === null && Channels && Channels.length)
      setActiveChannel! (Channels![0])

    console.log ("channels in chat interfacae : ")
    const type = chatType == CHANNEL ? "channelMessage" : "directMessage";
    if (!socket)
      setCounter!(counter! + 1)
  }, [Channels, userChannels]);

  if (isError)
    console.log ('something went wrong')
  else if (isLoading)
    console.log ('is loading')
  return (
    <Stack h="100%" w="100%" justifyContent={"center"}>
      {(
        chatType == PRIVATE ? (
          <DmProvider>
            {friendsList && friendsList.length > 0 ? 
            <PrivateChat channels={userChannels}/> :
              <NoFriendsPage />}
          </DmProvider>
        ) : (
          <CmProvider>
                {<ChannelsChat channels={userChannels} />}
          </CmProvider>
        )
      )}
    </Stack>
  );
};

export default ChatInterface;
