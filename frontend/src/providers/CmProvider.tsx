import { CmContext, ChannelsContext, GlobalContext } from "@/context/Contexts";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import apiClient from "../services/requestProcessor";
import { act } from "react-dom/test-utils";

interface CmProviderProps {
  children: React.ReactNode;
}

const CmProvider: React.FC<CmProviderProps> = ({ children }) => {
  const { activeChannel, Channels } = useContext(ChannelsContext);
  const [channelMessages, setChannelMessages] = useState<ChannelMessage[]>([]);
  const channelMessagesClient = new apiClient(
    `/chat/channels/${activeChannel!.id}/messages/?skip=0&take=300`
  );
  const { socket } = useContext(GlobalContext);

  useQuery({
    queryKey: ["channelMessages", activeChannel?.id],
    queryFn: async () =>
      channelMessagesClient.getData().then((res) => res.data),
    onSuccess: (data: any) => {
      const reversed = data.slice().reverse();
      setChannelMessages(reversed);
    },
    onError: (err) => {
      //console.log (err)
    },
  });

  
  useEffect(() => {
    
  }, [channelMessages]);
  return (
    <CmContext.Provider value={{ messages: channelMessages, setChannelMessages}}>
      {children}
    </CmContext.Provider>
  );
};

export default CmProvider;
