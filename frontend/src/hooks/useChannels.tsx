import apiClient from "@/services/requestProcessor"
import { useQuery } from "@tanstack/react-query"

const useChannels = ()=>{
    const channelsClient = new apiClient ("/chat/channels/")
    const {data, isLoading, isError} = useQuery (["channels"], {
        queryFn:async ()=> channelsClient.getData ().then (res=> res.data),
        onSuccess: (data:any) =>{
            console.log (data)
        },
        onError: (err:any) => console.log (err)
    })
    return {isError, isLoading, data}
}

export default useChannels