import { Stack, Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";
import ChatLobbyToggler from "./ChatLobbyToggler";
import ChatSection from "./ChatSection";
import LobbySection from "./LobbySection";
import ChannelChat from "./ChannelChat";
const ChatContainer: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(false);

  const toggleSelectedTab = (state:boolean) => setSelectedTab(state);
  
  return (

    <Grid templateRows={{base:'60px 400px', sm:'60px 400px', md:'60px 300px', lg:'60px 430px', xl:'60px 430px', vl:'60px 500px'}} w='100%' h='100%' maxH='100%' >
      <GridItem display='flex' justifyContent={'center'} alignItems='center'>
        <ChatLobbyToggler action={toggleSelectedTab} />
      </GridItem>
      <GridItem w='100%'  display={'flex'}  justifyContent={'center'} alignItems='center'>
         {selectedTab ? <ChatSection /> : <LobbySection />}
      </GridItem>
    </Grid>
    
  );
};

export default ChatContainer;
