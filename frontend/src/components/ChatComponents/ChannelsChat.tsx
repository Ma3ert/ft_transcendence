import { Grid, GridItem, Stack, Text } from "@chakra-ui/react";
interface ChannelsChatProps {}
import ChatBox from "../ChatComponents/chatBox";
import ChatNavigation from "../ChatComponents/ChatNavigation";
import ChannelSettings from "../ChatComponents/ChannelSettings";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";
import { useState, useContext, useEffect, use } from "react";
import {
  ChannelsContext,
  GlobalContext,
  UsersContext,
  DmContext,
  CmContext,
} from "@/context/Contexts";
import { getUserRole } from "../../../utils/helpers";
import CmProvider from "@/providers/CmProvider";
import MembersProvider from "@/providers/MemberProvider";
import NoChannelsPage from "./NoChannelsPage";
const ChannelsChat: React.FC<ChannelsChatProps> = ({}) => {
const { activeChannel, Channels } = useContext(ChannelsContext);
const {socket} = useContext (GlobalContext)
const {messages, setChannelMessages} = useContext (CmContext)

useEffect (()=>{
  console.log (`active channel id : ${activeChannel?.id}`)
      socket!.on("CM", (message: any) => {
        console.log ('in channels', activeChannel)
        if (activeChannel?.id === message.channelId)
        {
          console.log (` active channel : ${activeChannel?.id} channel : ${message.channelId}`)
          const messagesList = [...messages!];
          messagesList.push(message);
          setChannelMessages!(messagesList);
        }
      });
  return ()=>{
    socket!.off ("CM")
  }
}, [activeChannel, messages])

  return (
    <Stack w="100%" h="100%">
      {Channels && Channels.length ? (
        <Stack
          w="100%"
          h="100%"
          justifyContent={"center"}
          alignItems={"center"}
        >
          {activeChannel && Channels!.length > 0 ? (
            <MembersProvider>
              <Grid
                templateColumns={{ sm: "10% 80%", lg: "20% 60% 20%" }}
                w={{ base: "100%", lg: "100%", xl: "90%", vl: "85%" }}
                // border="1px"
                // borderColor="green"
                h="100%"
                mx="auto"
                justifyContent="space-between"
                alignItems="center"
              >
                <GridItem justifyContent="center" alignItems="center" h="100%">
                  <ChatNavigation />
                </GridItem>
                <GridItem
                  justifyContent="center"
                  alignItems="center"
                  w={"100%"}
                  h="100%"
                >
                  <ChatBox />
                </GridItem>
                <GridItem
                  justifyContent="center"
                  alignItems="center"
                  w={"100%"}
                  h="100%"
                >
                  <ChannelSettings />
                </GridItem>
              </Grid>
            </MembersProvider>
          ) : (
            <Text> No channels found </Text>
          )}
        </Stack>
      ) : (
        <NoChannelsPage />
      )}
    </Stack>
  );
};

export default ChannelsChat;
