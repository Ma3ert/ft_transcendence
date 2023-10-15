import apiClient  from '@/services/requestProcessor'
import { useQuery } from 'react-query'

const useDirectMessages = (peerId:string) => {

    const directMessagesClient = new apiClient(`/chat/direct/${peerId}/messages?skip=0&take=5`)

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['directMessages', peerId],
        queryFn: () => directMessagesClient.getData().then(res => res.data),
        onSuccess: (data) => {

        },
        onError: (error) => console.log(error)
    })
    return ({data, isLoading, isError, error})
}

