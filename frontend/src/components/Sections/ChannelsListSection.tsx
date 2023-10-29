import { Stack, Text } from "@chakra-ui/react";
import ScrollableStack from "../ScrollableStack";
import { useContext, useEffect, useState } from "react";
import { ChannelsContext } from "@/context/Contexts";
import ChannelField from "../ChatComponents/ChannelField";
import FriendsListHeader from "../ChatComponents/FriendsListHeader";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";
import { ModalWrapper } from "../Wrappers/ModalWrapper";
import NewChannel from "../ChatComponents/NewChannel";
interface ChannelsListProps {}

const ChannelsListSection: React.FC<ChannelsListProps> = ({}) => {
  const userChannelsClient = new apiClient("/chat/channels/");
  const {Channels, PublicChannels} = useContext (ChannelsContext)
  const [userChannels, setUserChannels] = useState<Channel[]> (Channels!)
  const [publicChannels, setPublicChannels] = useState<Channel[]> ([])

  return (
    <Stack
      w={"100%"}
      h="100%"
      spacing={5}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <FriendsListHeader type="channels" setChannelsList={setUserChannels} setPublicChannels={setPublicChannels}  />
      <ScrollableStack>
        {userChannels!.length ? (
          <>
          <Stack spacing={3} w='100%' h='auto'>
            <Text p={5} color="#5B6171" >
              Your channels
            </Text>
            {userChannels!.map((channel, index) => (
            <ChannelField key={index} channel={channel} />
          ))}
          </Stack>
          (
            {publicChannels.length > 0 && <Stack spacing={3} w='100%' h='auto'>
          <Text p={5} color="#5B6171" >
            Public channels
          </Text>
          {publicChannels!.map((channel, index) => (
          <ChannelField key={index} channel={channel} />
          ))}
        </Stack>})
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
