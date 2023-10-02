import { Stack } from "@chakra-ui/react";
import ScrollableStack from "../ScrollableStack";
import { useContext, useEffect, useState } from "react";
import { ChannelsContext } from "@/context/Contexts";
import ChannelField from "../ChatComponents/ChannelField";
import FriendsListHeader from "../ChatComponents/FriendsListHeader";
interface ChannelsListProps {}

const ChannelsListSection: React.FC<ChannelsListProps> = ({}) => {
  const { Channels, setChannels } = useContext(ChannelsContext);
  const [channelsList, setChannelsList] = useState<Channel[]>([]);

  useEffect(() => {
    setChannelsList(Channels!);
  }, [Channels]);
  return (
    <Stack
      w={"100%"}
      h="100%"
      spacing={5}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <FriendsListHeader type="channels" setChannelsList={setChannelsList} />
      <ScrollableStack>
        {channelsList.length ? (
          channelsList!.map((channel, index) => (
            <ChannelField key={index} channel={channel} />
          ))
        ) : (
          <Stack w="100%" h="100%" justifyContent="center" alignItems="center">
            <p style={{ color: "#5B6171" }}>You have no channels at the moment</p>
          </Stack>
        )}
      </ScrollableStack>
    </Stack>
  );
};

export default ChannelsListSection;
