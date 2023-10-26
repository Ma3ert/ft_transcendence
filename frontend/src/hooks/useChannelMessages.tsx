import {useQuery} from "react-query";
import apiClient from "@/services/requestProcessor";


const useChannelMessages = (channelId: string) => {

    const channelMessagesClient = new apiClient(`/chat/channels/${channelId}/messages?skip=0&take=5`)
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['channelMessages', channelId],
        queryFn: () => channelMessagesClient.getData().then(res => res.data),
        onSuccess: (data) => {

        },
        onError: (error) => //console.log(error)
    })

    return ({data, isLoading, isError, error})
}