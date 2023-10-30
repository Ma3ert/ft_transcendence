import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/services/requestProcessor";
import { ChannelsContext } from "@/context/Contexts";
import { HStack, Avatar, Text, Stack } from "@chakra-ui/react";
import UserAvatar from "../UserAvatar";

interface ChannelHeaderProps {}
const ChannelHeader: React.FC<ChannelHeaderProps> = () => {
  const channelClient = (channelId: string) =>
    new apiClient(`/chat/channels/${channelId}`);
  const [channel, setChannel] = useState<Channel | null>(null);
  const { activeChannel } = useContext(ChannelsContext);

  useQuery({
    queryKey: ["channel", activeChannel?.id],
    queryFn: () =>
      channelClient(activeChannel!.id!)
        .getData()
        .then((res) => res.data),
    onSuccess: (data: Channel) => {
      setChannel(data);
    },
    onError: (err) => {
      ////console.log(err);
    },
  });
  return (
    <HStack spacing={4} alignItems="center">
      {channel && (
        <>
          <UserAvatar isChannel={true} channel={activeChannel!} />
          <Stack spacing={2}>
            <Text
              fontFamily="visbyRound"
              fontWeight={"bold"}
              fontSize={"sm"}
              color="#5B6171"
            >
              {channel?.name}
            </Text>
            <Text fontFamily="visbyRound" fontSize={"xs"} color="#5B6171">
              {channel?.members} members
            </Text>
          </Stack>
        </>
      )}
    </HStack>
  );
};

export default ChannelHeader;
