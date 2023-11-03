
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/services/requestProcessor";


const useInvites = () => {

    const channelReceivedEnvitesClient = new apiClient(
        "/chat/channels/invites/recieved/"
    );
    const channelSentEnvitesClient = new apiClient("/chat/channels/invites/sent");
    const sentClient = new apiClient("/invites/sent");
    const recievedClient = new apiClient("/invites/received");
    const {data:recievedEnvites} = useQuery(["recievedEnvites"], {
        queryFn: async () => recievedClient.getData().then((data) => data.data),
        onSuccess: (response: any) => {
            
        },
        onError: (error) => {
        },
    });

    const {data:sentEnvites} = useQuery(["sentEnvites"], {
        queryFn: async () => sentClient.getData().then((data) => data.data),
        onSuccess: (response: any) => {
          
        },
        onError: (error) => {
        },
    });

    const {data:channelReceivedEnvites} = useQuery(["channelReceivedEnvites"], {
        queryFn: () =>
            channelReceivedEnvitesClient.getData().then((res) => res.data),
        onSuccess: (data: any) => {
           
        },
        onError: (err) => { },
    });
    const {data:channelSentEnvites} = useQuery(["channelSentEnvites"], {
        queryFn: () => channelSentEnvitesClient.getData().then((res) => res.data),
        onSuccess: (data: any) => {
           
        },
        onError: (err) => { },
    });

    return {recievedEnvites, sentEnvites, channelReceivedEnvites, channelSentEnvites};
}

export default useInvites;