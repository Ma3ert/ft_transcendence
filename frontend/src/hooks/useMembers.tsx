import apiClient from "@/services/requestProcessor";
import { useContext } from "react";
import { ChannelsContext } from "@/context/Contexts";
import { useQuery } from "@tanstack/react-query";
const useMembers = () =>{
    const { activeChannel} = useContext(ChannelsContext);
    const channelMembersClient = (channelId: string) =>
      new apiClient(`/chat/channels/${channelId}/members`);
   
  
    const {data:channelMembers} =useQuery({
      queryKey: ["channelMembers", activeChannel?.id],
      queryFn: async () =>
        channelMembersClient(activeChannel!.id!)
          .getData()
          .then((res) => res.data),
      onSuccess: (data: any) => {
      },
      onError: (err) => {
      },
    });
    return {channelMembers}
}

export default useMembers;