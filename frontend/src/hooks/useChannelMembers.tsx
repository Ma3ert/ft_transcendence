import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";

const useChannelMembers = (channelId: string) => {
  const channelMembersClient = new apiClient(
    `/chat/channels/${channelId}/members/`
  );

  const { data, isLoading, isError, error } = useQuery(
    {
        queryKey: ["channelMembers", channelId],
        queryFn: () => channelMembersClient.getData().then((res) => res.data),
        onSuccess:(data) =>{

        },
        onError: (error) => console.log(error)
    }
  );
  return { data, isLoading, isError, error}
};

export default useChannelMembers;