import React from "react";
import { HStack, Avatar, Stack, Text } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import {
  UsersContext,
  GlobalContext,
  UserStatusContext,
} from "@/context/Contexts";

interface PeerHeaderProps {}
const PeerHeader: React.FC<PeerHeaderProps> = () => {
  const { activePeer } = useContext(UsersContext);
  const { userStatus, setUserStatus } = useContext(UserStatusContext);

  useEffect(() => {}, [userStatus]);

  return (
    <HStack spacing={4} alignItems="center">
      <Avatar
        borderRadius={"full"}
        src={activePeer?.avatar!}
        name={activePeer?.username}
        size="sm"
      />
      <Stack spacing={2}>
        <Text
          fontFamily="visbyRound"
          fontWeight={"bold"}
          fontSize={"sm"}
          color="#5B6171"
        >
          {activePeer?.username}
        </Text>
        {userStatus && (
          <Text
            fontFamily="visbyRound"
            fontSize={"xs"}
            fontWeight={"bold"}
            color={userStatus!.status! === "ONLINE" ? "green.300" : "#DC585B"}
          >
            {userStatus!.status!.toLowerCase()}
          </Text>
        )}
      </Stack>
    </HStack>
  );
};

export default PeerHeader;
