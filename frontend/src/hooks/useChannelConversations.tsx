
import apiClient  from '@/services/requestProcessor';
import { useQuery } from 'react-query';

const useChannelConversations = (channelId: string) => {

    const channelConversationsClient = new apiClient(`/chat/channels`)
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['channelConversations', channelId],
        queryFn: () => channelConversationsClient.getData().then(res => res.data),
        onSuccess: (data) => {

        },
        onError: (error) => ////console.log(error)
    })

    return ({data, isLoading, isError, error})
}

export default useChannelConversations