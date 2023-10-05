
import React from "react";
import { HStack, Avatar, Stack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { UsersContext } from "@/context/Contexts";

interface PeerHeaderProps {}
const PeerHeader: React.FC<PeerHeaderProps> = () => {

    const {activePeer} = useContext (UsersContext)
  return (
    <HStack spacing={4} alignItems="center">
      <Avatar
        borderRadius={"full"}
        src={activePeer?.avatar!}
        name={activePeer?.username}
        size="sm"
      />
      <Stack spacing={2}>
        <Text fontWeight={"bold"} fontSize={"sm"} color="#5B6171">
          {activePeer?.username}
        </Text>
        <Text
          fontSize={"xs"}
          color={status == "online" ? "green.300" : "#5B6171"}
        >
          online
        </Text>
      </Stack>
    </HStack>
  );
};


export default PeerHeader;