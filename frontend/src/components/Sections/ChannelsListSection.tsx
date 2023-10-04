import { Stack } from "@chakra-ui/react";
import ScrollableStack from "../ScrollableStack";
import { useContext, useEffect, useState } from "react";
import { ChannelsContext } from "@/context/Contexts";
import ChannelField from "../ChatComponents/ChannelField";
import FriendsListHeader from "../ChatComponents/FriendsListHeader";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";
interface ChannelsListProps {}

const ChannelsListSection: React.FC<ChannelsListProps> = ({}) => {
  const userChannelsClient = new apiClient("/chat/channels/");
  const [channelsList, setChannels] = useState<Channel[]>([]);
  useQuery("channels", {
    queryFn: () => userChannelsClient.getData().then((res) => res.data),
    onSuccess: (data: Channel[]) => {
      setChannels(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <Stack
      w={"100%"}
      h="100%"
      spacing={5}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <FriendsListHeader type="channels" setChannelsList={setChannels} />
      <ScrollableStack>
        {channelsList.length ? (
          channelsList!.map((channel, index) => (
            <ChannelField key={index} channel={channel} />
          ))
        ) : (
          <Stack w="100%" h="100%" justifyContent="center" alignItems="center">
            <p style={{ color: "#5B6171" }}>
              You have no channels at the moment
            </p>
          </Stack>
        )}
      </ScrollableStack>
    </Stack>
  );
};

export default ChannelsListSection;
