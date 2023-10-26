import React, { useState, useContext } from "react";
import { useQuery } from "react-query";
import apiClient from "@/services/requestProcessor";
import { ChannelsContext } from "@/context/Contexts";
import { HStack, Avatar, Text, Stack } from "@chakra-ui/react";

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
      console.log(err);
    },
  });
  return (
    <HStack spacing={4} alignItems="center">
      {channel && (
        <>
          <Avatar
            borderRadius={"15px"}
            src={`http://e1r9p3.1337.ma:3000/${channel!.avatar}`}
            name={channel?.name}
            size="sm"
          />
          <Stack spacing={2}>
            <Text fontWeight={"bold"} fontSize={"sm"} color="#5B6171">
              {channel?.name}
            </Text>
            <Text fontSize={"xs"} color="#5B6171">
              {channel?.members} members
            </Text>
          </Stack>
        </>
      )}
    </HStack>
  );
};

export default ChannelHeader;
