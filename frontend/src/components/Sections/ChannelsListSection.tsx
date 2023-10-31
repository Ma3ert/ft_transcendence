import { Stack, Text } from "@chakra-ui/react";
import ScrollableStack from "../ScrollableStack";
import { useContext, useEffect, useState } from "react";
import { ChannelsContext, UserChannelsContext } from "@/context/Contexts";
import ChannelField from "../ChatComponents/ChannelField";
import FriendsListHeader from "../ChatComponents/FriendsListHeader";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "@tanstack/react-query";
import { ModalWrapper } from "../Wrappers/ModalWrapper";
import NewChannel from "../ChatComponents/NewChannel";
// import { useQueryClient } from "@tanstack/react-query";
import useChannels from "@/hooks/useChannels";
import usePublicChannels from "@/hooks/usePublicChannels";
import ChannelsList from "../ChatComponents/ChannelsList";
interface ChannelsListProps {}

const ChannelsListSection: React.FC<ChannelsListProps> = ({}) => {
  const userChannelsClient = new apiClient("/chat/channels/");
  const { setPublicChannels:publicChannelsSetter, setActiveChannel, activeChannel , setChannels} = useContext(ChannelsContext);
  const {data:channels, isError, isLoading} = useChannels ()
  const {data:publicChannelsList} = usePublicChannels ()
  const [userChannels, setUserChannels] = useState <Channel[]> ([])
  const [publicChannels, setPublicChannels] = useState<Channel[]>([]);
  

  useEffect (()=>{
    console.table (channels)
    console.table (publicChannels)
    setUserChannels (channels)
    setChannels! (channels)
    setPublicChannels (publicChannelsList!)
    if (activeChannel === null && channels && channels.length)
      setActiveChannel! (channels[0])
  }, [channels, publicChannelsList])
  if (isError)
    return <Text>something went wrong</Text>
  else if (isLoading)
    return <Text>loading ...</Text>

  return (
    <Stack
      w={"100%"}
      h="100%"
      spacing={5}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <UserChannelsContext.Provider value={{Channels: userChannels, PublicChannels:publicChannels }}>
      <ChannelsList />
      </UserChannelsContext.Provider>
    </Stack>
  );
};

export default ChannelsListSection;
