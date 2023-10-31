import { CmContext, ChannelsContext, GlobalContext } from "@/context/Contexts";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/requestProcessor";
import { act } from "react-dom/test-utils";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface CmProviderProps {
  children: React.ReactNode;
}

const CmProvider: React.FC<CmProviderProps> = ({ children }) => {
  const { activeChannel} = useContext(ChannelsContext);
  const [channelMessages, setChannelMessages] = useState<ChannelMessage[]>([]);
  const channelMessagesClient = new apiClient(
    `/chat/channels/${activeChannel!.id}/messages/?skip=0&take=300`
  );
  const { currentUser } = useAuth();
  const router = useRouter();
  if (currentUser === undefined) router.push("/");

  useQuery({
    queryKey: ["channelMessages", activeChannel?.id],
    queryFn: async () =>
      channelMessagesClient.getData().then((res) => res.data),
    onSuccess: (data: any) => {
      const reversed = data.slice().reverse();
      setChannelMessages(reversed);
    },
    onError: (err) => {
      ////console.log (err)
    },
  });

  return (
    <CmContext.Provider
      value={{ messages: channelMessages, setChannelMessages }}
    >
      {children}
    </CmContext.Provider>
  );
};

export default CmProvider;
