import { Stack, Text } from "@chakra-ui/react";
import ScrollableStack from "../ScrollableStack";
import { useContext, useEffect, useState } from "react";
import { ChannelsContext } from "@/context/Contexts";
import ChannelField from "../ChatComponents/ChannelField";
import FriendsListHeader from "../ChatComponents/FriendsListHeader";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "@tanstack/react-query";
import { ModalWrapper } from "../Wrappers/ModalWrapper";
import NewChannel from "../ChatComponents/NewChannel";
import { useQueryClient } from "@tanstack/react-query";
interface ChannelsListProps {}

const ChannelsListSection: React.FC<ChannelsListProps> = ({}) => {
  const userChannelsClient = new apiClient("/chat/channels/");
  const { Channels, PublicChannels ,setChannels, setPublicChannels:publicChannelsSetter, setActiveChannel, activeChannel } = useContext(ChannelsContext);
  const [publicChannels, setPublicChannels] = useState<Channel[]>([]);
  const [userChannels, setUserChannels] = useState<Channel[]>([]);
  const queryClient = useQueryClient();
  // useEffect(() => {}, [Channels]);

  
  
  useEffect(() => {
    setUserChannels(queryClient.getQueryData(['channels'])!);
  },[])
  console.log ("from channel list: ", userChannels);
  return (
    <Stack
      w={"100%"}
      h="100%"
      spacing={5}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <FriendsListHeader
        type="channels"
        setChannelsList={setUserChannels}
        setPublicChannels={setPublicChannels}
      />
      <ScrollableStack>
        {userChannels && userChannels!.length > 0 ? (
          <>
            <Stack spacing={3} w="100%" h="auto">
              <Text p={5} color="#5B6171">
                Your userChannels
              </Text>
              {userChannels!.map((channel, index) => (
                <ChannelField key={index} channel={channel} />
              ))}
            </Stack>
            (
            {publicChannels.length > 0 && (
              <Stack spacing={3} w="100%" h="auto">
                <Text p={5} color="#5B6171">
                  Public channels
                </Text>
                {publicChannels!.map((channel, index) => (
                  <ChannelField key={index} channel={channel} />
                ))}
              </Stack>
            )}
            )
          </>
        ) : (
          <Stack
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
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
