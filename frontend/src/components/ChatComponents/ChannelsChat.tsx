import { Grid, GridItem, Stack, Text, useToast } from "@chakra-ui/react";
interface ChannelsChatProps {
  channels?:Channel []
 }
import ChatBox from "../ChatComponents/chatBox";
import ChatNavigation from "../ChatComponents/ChatNavigation";
import ChannelSettings from "../ChatComponents/ChannelSettings";
import apiClient from "@/services/requestProcessor";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useContext, useEffect, use } from "react";
import useUserStatus from "@/hooks/useUserStatus";
enum CHANNEL_EVENT_TYPE {
  BAN = "BANNED",
  UNBAN = "UNBANED",
  MUTE = "MUTED",
  KICK = "KICKED",
  UPGRADE = "UPGRADED",
  DOWNGRADE = "DOWNGRADED",
}
import {
  ChannelsContext,
  GlobalContext,
  UsersContext,
  DmContext,
  CmContext,
  AppNavigationContext,
  MembersContext,
} from "@/context/Contexts";

import NoChannelsPage from "./NoChannelsPage";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import useBlockedUsers from "@/hooks/useBlockedUser";
import useMembers from "@/hooks/useMembers";

const ChannelsChat: React.FC<ChannelsChatProps> = ({ 
  channels
}) => {
  const { activeChannel } = useContext(ChannelsContext);
  const { socket } = useContext(GlobalContext);
  const { messages, setChannelMessages } = useContext(CmContext);
  const { Users } = useContext(UsersContext);
  const { blockedUsers } = useBlockedUsers();
  const router = useRouter()
  const toast = useToast()
  const {currentUser} = useAuth ();
  const queryClient = useQueryClient ();
  const {channelMembers} = useMembers ();


  useEffect(() => {
    
    if (socket && activeChannel) {
      socket!.on("CM", (message: any) => {
        const userIsBlocked = blockedUsers!.find(
          (user) => user.id === message.senderId
        );
        console.log(`use is blocked ${userIsBlocked}`);
        if (!userIsBlocked) {
          if (activeChannel?.id === message.channelId) {
            const messagesList = [...messages!];
            messagesList.push(message);
            setChannelMessages!(messagesList);
          }
        }
      });
      socket.on("channelEvent", (data: any) => {
        console.log ('')
        if (data.type ==   CHANNEL_EVENT_TYPE.KICK && data.userId === currentUser.id )
        {
          if (data.channelId === activeChannel.id) {
            toast.isActive("kick") && toast({
              id: "kick",
              title: "you have been kick from this channel",
              status: "error",
              isClosable: true,
              duration: 9000
            })
            router.push("/")
          }

        }
        else
        {
          queryClient.invalidateQueries (["channels"]);
          queryClient.invalidateQueries (["channelMembers", activeChannel.id]);
        }
      })
    }
    return () => {
      if (socket && activeChannel!) 
      {
        socket!.off("CM");
        socket!.off ("channelEvent");
      }
    };
  }, [activeChannel, messages, channelMembers]);

  return (
    <Stack w="100%" h="100%">
    
        {channels && channels!.length ? (
          <Stack
            w="100%"
            h="100%"
            justifyContent={"center"}
            alignItems={"center"}
          >
            {activeChannel! && channels!.length > 0 ? (
                <Grid
                  templateColumns={{ sm: "10% 80%", lg: "20% 60% 20%" }}
                  w={{ base: "100%", lg: "100%", xl: "90%", vl: "85%" }}
                  h="100%"
                  mx="auto"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <GridItem justifyContent="center" alignItems="center" h="100%">
                    <ChatNavigation channels={channels}/>
                  </GridItem>
                  <GridItem
                    justifyContent="center"
                    alignItems="center"
                    w={"100%"}
                    h="100%"
                  >
                    <ChatBox members={channelMembers} />
                  </GridItem>
                  <GridItem
                    justifyContent="center"
                    alignItems="center"
                    w={"100%"}
                    h="100%"
                  >
                    <ChannelSettings members={channelMembers} />
                  </GridItem>
                </Grid>
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
