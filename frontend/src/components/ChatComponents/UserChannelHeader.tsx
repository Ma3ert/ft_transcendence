import React, { useContext, useEffect } from "react";
import { Avatar, HStack, Text, Stack } from "@chakra-ui/react";
import { ChannelsContext, ChatContext , UsersContext} from "@/context/Contexts";
import { PRIVATE, CHANNEL } from "@/../contstants";

interface UserChannelHeaderProps {
  status?: userStatus;
}

const UserChannelHeader: React.FC<UserChannelHeaderProps> = ({ status }) => {
  const { chatType } = useContext(ChatContext);
  const {activePeer} = useContext (UsersContext)
  const {activeChannel} = useContext (ChannelsContext)

  useEffect(() => {
    console.log (`active channel ${activeChannel?.name}`)
    console.log ('chat type ' + chatType)
  }, [])
  return (
    <HStack spacing={4} alignItems="center">
      <Avatar
        borderRadius={chatType == CHANNEL ? "15px" : "full"}
        src={
          chatType == PRIVATE ? activePeer?.avatar : activeChannel?.imageUrl
        }
        name={chatType == PRIVATE ? activePeer?.username : activeChannel?.name}
        size="sm"
      />
      <Stack spacing={2}>
        <Text fontWeight={"bold"} fontSize={"sm"} color="#5B6171">
          {chatType == PRIVATE ? activePeer?.username : activeChannel?.name}
        </Text>
        <Text
          fontSize={"xs"}
          color={(chatType == PRIVATE) && (status == "online") ? "green.300" : "#5B6171"}
        >
          {chatType == PRIVATE ? status : `${activeChannel?.members?.length || 0} members`}
        </Text>
      </Stack>
    </HStack>
  );
};


export default UserChannelHeader;