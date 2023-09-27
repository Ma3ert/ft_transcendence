import {useQuery} from "react-query";
import apiClient from "@/services/requestProcessor";

const useDirectConversations = () => {

    const directConversationsClient = new apiClient(`/chat/direct/`)

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['directConversations'],
        queryFn: () => directConversationsClient.getData().then(res => res.data),
        onSuccess: (data) => {

        },
        onError: (error) => console.log(error)
    })
    return ({data, isLoading, isError, error})
}

export default useDirectConversations