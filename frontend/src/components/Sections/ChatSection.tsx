import React, { useContext } from "react";
import { Grid, GridItem } from "@chakra-ui/layout";
import { friendsList, Channels } from "../../../contstants";
import ChatBox from "../ChatComponents/chatBox";
import ChatNavigation from "../ChatComponents/ChatNavigation";
import ChannelSettings from "../ChatComponents/ChannelSettings";
import { ChatContext } from "../../context/Contexts";
interface ChatProps {}
const Chat: React.FC<ChatProps> = ({}) => {
  const { Friends, Channels } = useContext(ChatContext);
  return (
    <Grid
      templateColumns={{ sm: "10% 80%", lg: "20% 60% 20%" }}
      w={{base:"100%", lg:"100%", xl:'80%', vl:'70%'}}
      border='1px' borderColor='green'
      h="100%"
      mx="auto"
      justifyContent="center"
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
export default Chat;
