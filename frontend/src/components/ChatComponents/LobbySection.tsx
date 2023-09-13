import { HStack, Stack } from "@chakra-ui/react";
import FriendsList from "./FriendsList";
import { friendsList, Channels } from "../../../contstants";
import ChannelChat from "./ChannelChat";
import ChannelSettings from "./ChannelSettings";

const LobbySection:React.FC = () => {
    return (
        <HStack
        justify={"center"}
        spacing={8}
        alignItems={"start"}
        w="100%"
        h="100%"
        p={2}
      >
        <Stack alignItems={"center"} w={"15%"} h='100%'>
          <FriendsList isForChannel={true} friends={friendsList} channels={Channels}/>
        </Stack>
        <ChannelChat isPrivateChat={false} Channel={Channels[0]}  />
        <Stack alignItems={"center"} w={"15%"} h='100%'>
          <ChannelSettings />
        </Stack>
      </HStack>
    )
}

export default LobbySection