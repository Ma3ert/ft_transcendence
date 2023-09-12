import { Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import ChatLobbyToggler from "./ChatLobbyToggler";
import ChatSection from "./ChatSection";
import LobbySection from "./LobbySection";
const ChatContainer: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<boolean>(false);

  const toggleSelectedTab = (state:boolean) => setSelectedTab(state);
  
  return (
    <Stack
      justify={"center"}
      alignItems={"center"}
      w="100%"
      h="100%"
      spacing={8}
    >
      <ChatLobbyToggler action={toggleSelectedTab} />

      <Stack
        w="100%"
        h="100%"
        flex={1}
        border="1px"
        borderColor="green"
        justify={"center"}
        alignItems={"center"}
      >
        {selectedTab ? <ChatSection /> : <LobbySection />                                           }
      </Stack>
    </Stack>
  );
};

export default ChatContainer;
