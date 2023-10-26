import { Button, Text, HStack, Icon, Avatar } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { UsersContext } from "@/context/Contexts";
import { FaCheck } from "react-icons/fa6";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import useEnviteHandler from "@/hooks/useEnviteHandler";
import useChannelSettingsManager from "@/hooks/useChannelSettingsManager";
import { AcceptProtectedChannel } from "./AcceptProtectedChannel";
interface EnviteFieldProps {
  type: "sent" | "received";
  envite: GlobalEnvite;
}

const getEnviteMessage = (user: User, type: string, envite: GlobalEnvite) => {
  if (type == "sent") {
    if (envite.isChannelEnvite) {
      return `You sent a channel invite to ${user.username}`;
    }
    return `You sent a friend request to ${user.username}`;
  } else {
    if (envite.isChannelEnvite) {
      return `${user.username} invited you join ${envite.channel?.name}`;
    }
    return `${user.username} sent you a friend request`;
  }
};

const EnviteField: React.FC<EnviteFieldProps> = ({ type, envite }) => {
  const [peer, setPeer] = useState<User>();
  const { Users } = useContext(UsersContext);
  const { AcceptFriendRequest, DeleteFriendRequest } = useEnviteHandler();
  const { acceptChannelEnvite, declineChannelEnvite } =
    useChannelSettingsManager();

  useEffect(() => {
    if (type == "sent") {
      setPeer(Users!.find((user) => user.id == envite.receiverId));
    } else if (type == "received") {
      setPeer(Users!.find((user) => user.id == envite.senderId));
    }
    //console.log (envite)
  }, [Users]);
  return (
    <Button minH="50px" variant={"field"} w={"100%"} h="auto" p={2}>
      <HStack
        w={"100%"}
        h="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack spacing={2}>
          <Avatar size="sm" src={peer?.avatar} name={peer?.username} />
          <Text> {peer && getEnviteMessage(peer!, type, envite)}</Text>
        </HStack>
        {type == "received" ? (
          <HStack spacing={5}>
            {envite.channel && envite!.channel!.type === "PROTECTED" ? (
              <AcceptProtectedChannel envite={envite} />
            ) : (
              <Icon
                onClick={() => {
                  if (envite.isChannelEnvite) {
                    const res: UserChannel = {
                      channelid: envite.channel?.id,
                      userid: envite.senderId,
                    };
                    acceptChannelEnvite(res);
                  } else {
                    AcceptFriendRequest(envite.enviteId);
                  }
                }}
                as={CheckIcon}
                fontSize={"18px"}
                _hover={{ transform: "scale(1.1)", color: "green.400" }}
              />
            )}
            <Icon
              onClick={() => {
                if (envite.isChannelEnvite) {
                  const res: UserChannel = {
                    channelid: envite.channel?.id,
                    userid: envite.senderId,
                  };
                  declineChannelEnvite(res);
                } else {
                  DeleteFriendRequest(envite.enviteId);
                }
              }}
              as={CloseIcon}
              fontSize={"18px"}
              _hover={{ transform: "scale(1.1)", color: "#DC585B" }}
            />
          </HStack>
        ) : (
          <Text>pending</Text>
        )}
      </HStack>
    </Button>
  );
};

export default EnviteField;
