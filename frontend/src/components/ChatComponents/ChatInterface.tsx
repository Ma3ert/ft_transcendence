import React, { useEffect, useContext } from "react";
import { Grid, GridItem, Stack, Button, Text } from "@chakra-ui/react";
import ChatBox from "../ChatComponents/chatBox";
import ChatNavigation from "../ChatComponents/ChatNavigation";
import ChannelSettings from "../ChatComponents/ChannelSettings";
import EventListener from "../../../utils/EventListener";
import { GlobalContext, ChatContext } from "@/context/Contexts";
import { CHANNEL } from "../../../contstants";
import { ModalWrapper } from "../Wrappers/ModalWrapper";
import NewChannel from "./NewChannel";

const ChatInterface: React.FC = ({}) => {
  const { socket } = useContext(GlobalContext);
  const { chatType } = useContext(ChatContext);
  useEffect (()=>{
      const type = chatType == CHANNEL ? "channelMessage" : "directMessage"
       console.log (type)
  }
  ,[])
  return (
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
      <GridItem justifyContent="center" alignItems="center" w={"100%"} h="100%">
        <ChatBox />
      </GridItem>
      <GridItem justifyContent="center" alignItems="center" w={"100%"} h="100%">
        {chatType == CHANNEL ? (
          <ChannelSettings />
        ) : (
          <Stack justify={'end'} alignItems={'center'} w='100%' h='90%'>
            <ModalWrapper type='regular' buttonVariant="largeSecondary" buttonValue={<Text>Create channel</Text>}>
              <NewChannel />
            </ModalWrapper>
          </Stack>
        )}
      </GridItem>
    </Grid>
  );
};

export default ChatInterface;
