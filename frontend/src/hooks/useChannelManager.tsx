import apiClient from "@/services/requestProcessor"
import { useMutation } from "react-query";

const useChannelManager = () => {
    const channelClient = new apiClient ('/chat/channels/');
    const channelById = (channelId: string) => new apiClient (`/chat/channels/${channelId}/`)
    const joinChannelClient = (channelId: string) => new apiClient (`/chat/channels/${channelId}/join/`)
    const leaveChannelClient = (channelId: string) => new apiClient (`/chat/channels/${channelId}/leave/`)

    const newChannelMutation = useMutation ({
        mutationFn: (channelBody: any) => channelClient.postData(channelBody),
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error)
    })

    const deleteChannelMutation = useMutation ({
        mutationFn: (channelId: string) => channelById(channelId).deleteData(),
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error)
    })

    const jointChannelMutation = useMutation ({
        mutationFn: (channel:any) => joinChannelClient(channel.channelId).postData({
            password: channel.password
        }),
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error)
    })

    const leaveChannelClientMutation = useMutation ({
        mutationFn: (channelId: string) => leaveChannelClient(channelId).deleteData (),
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error)
    })
    

    function createChannel (channelName:string, channelType:string ){
        newChannelMutation.mutate({name: channelName, type: channelType})
    }

    function removeChannel (channelId: string){
        deleteChannelMutation.mutate(channelId)
    }

    function joinChannel (channelId: string, password: string){
        jointChannelMutation.mutate({channelId, password})
    }

    function leaveChannel (channelId: string){
        leaveChannelClientMutation.mutate(channelId)
    }

    return {createChannel, removeChannel, joinChannel, leaveChannel}
}

export default useChannelManager