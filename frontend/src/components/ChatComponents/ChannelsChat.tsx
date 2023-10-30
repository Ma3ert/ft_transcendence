import { Grid, GridItem, Stack, Text } from "@chakra-ui/react";
interface ChannelsChatProps {}
import ChatBox from "../ChatComponents/chatBox";
import ChatNavigation from "../ChatComponents/ChatNavigation";
import ChannelSettings from "../ChatComponents/ChannelSettings";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";
import { useState, useContext, useEffect, use } from "react";
import useUserStatus from "@/hooks/useUserStatus";
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
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
const ChannelsChat: React.FC<ChannelsChatProps> = ({}) => {
  const { activeChannel, Channels } = useContext(ChannelsContext);
  const { socket } = useContext(GlobalContext);
  const { messages, setChannelMessages } = useContext(CmContext);
  const {Users} = useContext (UsersContext)
  
  useEffect(() => {
    if (socket) {
      socket!.on("CM", (message: any) => {
        const user = Users!.find (user=> user.id === message.senderId)
        const { userIsBlocked } = useUserStatus(user!);
        console.log (`use is blocked ${userIsBlocked}`)
        if (!userIsBlocked)
        {
          if (activeChannel?.id === message.channelId) {
            const messagesList = [...messages!];
            messagesList.push(message);
            setChannelMessages!(messagesList);
          }
        }
      });
    }
    return () => {
      socket!.off("CM");
    };
  }, [activeChannel, messages]);

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
            <Text fontFamily="visbyRound"> No channels found </Text>
          )}
        </Stack>
      ) : (
        <NoChannelsPage />
      )}
    </Stack>
  );
};

export default ChannelsChat;
