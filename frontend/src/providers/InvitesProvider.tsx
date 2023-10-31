import { GlobalContext, InvitesContext } from "@/context/Contexts";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/services/requestProcessor";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface InvitesProviderProps {
  children: React.ReactNode;
}

const getGlobalChannelEnvites = (envites: ChannelEnvite[]) => {
  const response: GlobalEnvite[] = envites.map((envite) => ({
    isChannelEnvite: true,
    enviteId: envite.id,
    senderId: envite.sender,
    receiverId: envite.receiver, // Add receiverId property
    createdAt: envite.created_at,
    channel: envite.channel,
  }));

  return response;
};

const getGlobalFriendsEnvites = (envites: Envite[]) => {
  const response: GlobalEnvite[] = envites.map((envite) => ({
    isChannelEnvite: false,
    enviteId: envite.id,
    senderId: envite.inviteOwnerId,
    receiverId: envite.inviteUserId, // Add receiverId property
    createdAt: envite.createdAt,
  }));
  return response;
};
const InvitesProvider: React.FC<InvitesProviderProps> = ({ children }) => {
  const channelReceivedEnvitesClient = new apiClient(
    "/chat/channels/invites/recieved/"
  );
  const channelSentEnvitesClient = new apiClient("/chat/channels/invites/sent");
  const [channelRecieved, setChannelRecieved] = useState<GlobalEnvite[]>([]);
  const [channelSent, setChannelSent] = useState<GlobalEnvite[]>([]);
  const [friendRecieved, setFriendRecieved] = useState<GlobalEnvite[]>([]);
  const [friendSent, setFriendSent] = useState<GlobalEnvite[]>([]);
  const recievedClient = new apiClient("/invites/received");
  const sentClient = new apiClient("/invites/sent");


  useQuery(["recievedEnvites"], {
    queryFn: async () => recievedClient.getData().then((data) => data.data),
    onSuccess: (response: any) => {
      if (response.data && response.data.length) {
        const newList: GlobalEnvite[] = getGlobalFriendsEnvites(response.data);
        setFriendRecieved(newList);
      }
    },
    onError: (error) => {
    },
  });

  useQuery(["sentEnvites"], {
    queryFn: async () => sentClient.getData().then((data) => data.data),
    onSuccess: (response: any) => {
      if (response.data && response.data.length) {
        const newList: GlobalEnvite[] = getGlobalFriendsEnvites(response.data);
        setFriendSent(newList);
      }
    },
    onError: (error) => {
    },
  });

  useQuery(["channelReceivedEnvites"], {
    queryFn: () =>
      channelReceivedEnvitesClient.getData().then((res) => res.data),
    onSuccess: (data: any) => {
      if (data! && data!.length) {
        const newList: GlobalEnvite[] = getGlobalChannelEnvites(data!);
        setChannelRecieved(newList);
      }
    },
    onError: (err) => {},
  });
  useQuery(["channelSentEnvites"], {
    queryFn: () => channelSentEnvitesClient.getData().then((res) => res.data),
    onSuccess: (data: any) => {
      if (data! && data!.length) {
        const newList: GlobalEnvite[] = getGlobalChannelEnvites(data!);
        setChannelSent(newList);
      }
    },
    onError: (err) => {},
  });
  return (
    <InvitesContext.Provider
      value={{ friendRecieved, friendSent, channelSent, channelRecieved }}
    >
      {children}
    </InvitesContext.Provider>
  );
};

export default InvitesProvider;
