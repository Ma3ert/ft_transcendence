import React, { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../services/requestProcessor";
import {
  GlobalContext,
  MembersContext,
  ChannelsContext,
  UsersContext,
} from "@/context/Contexts";
import { getUserRole } from "../../utils/helpers";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface MembersProviderProps {
  children: React.ReactNode;
  channelId?: string;
}

const MembersProvider: React.FC<MembersProviderProps> = ({
  children,
  channelId,
}) => {
  const { activeChannel} = useContext(ChannelsContext);
  const channelMembersClient = (channelId: string) =>
    new apiClient(`/chat/channels/${channelId}/members`);
  const [channelMembers, setChannelMembers] = useState<Member[]>([]);
  const [loggedInUserRole, setLoggedInUserRole] = useState<string>("");
  const id = channelId ? channelId : activeChannel?.id;

 

  useQuery({
    queryKey: ["channelMembers", id],
    queryFn: async () =>
      channelMembersClient(id!)
        .getData()
        .then((res) => res.data),
    onSuccess: (data: any) => {
      setChannelMembers(data);
    },
    onError: (err) => {
    },
  });
  return (
    <MembersContext.Provider
      value={{ members: channelMembers, loggedInUserRole }}
    >
      {children}
    </MembersContext.Provider>
  );
};

export default MembersProvider;
