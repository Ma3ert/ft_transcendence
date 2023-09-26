import React, { useContext } from "react";
import { Avatar, HStack, Text, Stack } from "@chakra-ui/react";
import { ChatContext } from "@/context/Contexts";
import { PRIVATE, CHANNEL } from "@/../contstants";

interface UserChannelHeaderProps {
  status?: userStatus;
}

const UserChannelHeader: React.FC<UserChannelHeaderProps> = ({ status }) => {
  const { activePeer, activeChannel, chatType } = useContext(ChatContext);
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
          {chatType == PRIVATE ? status : `${activeChannel?.members.length} members`}
        </Text>
      </Stack>
    </HStack>
  );
};


export default UserChannelHeader;