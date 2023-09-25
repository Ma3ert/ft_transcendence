import React, {useEffect, useContext} from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import ChatBox from "../ChatComponents/chatBox";
import ChatNavigation from "../ChatComponents/ChatNavigation";
import ChannelSettings from "../ChatComponents/ChannelSettings";
import EventListener from "../../../utils/EventListener";
import { GlobalContext } from "@/context/Contexts";

const ChatInterface: React.FC = ({}) => {

  const {socket} = useContext (GlobalContext)
  useEffect (()=>{
       EventListener (socket,'checkChatNotification',  (msg:any)=>{
          console.log (`${msg} from server`)
      })
  }
  ,[])
  return (
    <Grid
      templateColumns={{ sm: "10% 80%", lg: "20% 60% 20%" }}
      w={{ base: "100%", lg: "100%", xl: "90%", vl: "85%" }}
      border="1px"
      borderColor="green"
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
        <ChannelSettings />
      </GridItem>
    </Grid>
  );
};

export default ChatInterface;