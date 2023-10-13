import {useQuery} from "react-query";
import apiClient from "@/services/requestProcessor";
import { useContext } from "react";
import { UsersContext } from "@/context/Contexts";

const useDirectConversations = () => {

    const directConversationsClient = new apiClient(`/chat/direct/`)
    const {setFriendsConversations, friendsList, setActivePeer} = useContext (UsersContext)

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['directConversations'],
        queryFn: () => directConversationsClient.getData().then(res => res.data),
        onSuccess: (data:String[]) => {
            if (data.length)
            {
                const filteredData = friendsList!.filter((friend:User) => data.includes(friend.id))
                if (filteredData.length)
                {
                    setFriendsConversations!(filteredData)
                    setActivePeer!(filteredData[0])
                }
            }
        },
        onError: (error) => console.log(error)
    })
    return ({data, isLoading, isError, error})
}

export default useDirectConversations