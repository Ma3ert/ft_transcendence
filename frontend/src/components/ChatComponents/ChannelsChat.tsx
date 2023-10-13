import { Grid, GridItem, Stack, Text } from "@chakra-ui/react";
interface ChannelsChatProps {}
import ChatBox from "../ChatComponents/chatBox";
import ChatNavigation from "../ChatComponents/ChatNavigation";
import ChannelSettings from "../ChatComponents/ChannelSettings";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";
import { useState, useContext } from "react";
import {
  ChannelsContext,
  GlobalContext,
  UsersContext,
  DmContext,
} from "@/context/Contexts";
import { getUserRole } from "../../../utils/helpers";
import CmProvider from "@/providers/CmProvider";
import MembersProvider from "@/providers/MemberProvider";
import NoChannelsPage from "./NoChannelsPage";
const ChannelsChat: React.FC<ChannelsChatProps> = ({}) => {
  const { activeChannel, Channels } = useContext(ChannelsContext);

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
                  <CmProvider>
                    <ChatBox />
                  </CmProvider>
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
