import { ChannelsContext } from "@/context/Contexts";
import { useEffect, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/requestProcessor";

interface ChannelsProviderProps {
  children: React.ReactNode;
}
const ChannelsProvider: React.FC<ChannelsProviderProps> = ({ children }) => {
  const [Channels, setChannels] = useState<Channel[]>([]);
  const [PublicChannels, setPublicChannels] = useState<Channel[]>([]);
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
  const [activeChannelMembers, setActiveChannelMembers] = useState<User[]>([]);
  const [channelConversations, setChannelConversations] = useState<string[]>(
    []
  );
  const userChannelsClient = new apiClient("/chat/channels/");
  const publicChannelsClient = new apiClient("/chat/public/");
  const [counter, setCounter] = useState<number>(0);

  useQuery(["channels"], {
    queryFn: () => userChannelsClient.getData().then((res) => res.data),
    onSuccess: (data: Channel[]) => {
      setChannels(data);
      if (activeChannel === null) setActiveChannel(data[0]);
    },
    onError: (err) => {
      ////console.log(err)
    },
  });

  useQuery(["publicChannels"], {
    queryFn: () => publicChannelsClient.getData().then((res) => res.data),
    onSuccess: (data: Channel[]) => {
      setPublicChannels(data);
    },
    onError: (err) => {},
  });

  useEffect(() => {
    // fetch channels
    // fetch active channel
    // fetch active channel members
    // fetch channel conversations
  }, []);
  return (
    <ChannelsContext.Provider
      value={{
        Channels,
        activeChannel,
        setActiveChannel,
        PublicChannels,
        setPublicChannels,
        setChannels,
      }}
    >
      {children}
    </ChannelsContext.Provider>
  );
};

export default ChannelsProvider;
