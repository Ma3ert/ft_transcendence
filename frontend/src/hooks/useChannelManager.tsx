import apiClient from "@/services/requestProcessor"
import { useMutation } from "react-query";
import { useToast } from "@chakra-ui/react";
import { useSuccess, useFailure } from "./useAlerts";
import { useQueryClient } from "react-query";
import { AppNavigationContext } from "@/context/Contexts";
import { useContext } from "react";
import useAvatarUpdater from "./useAvatarUpdater";


const useChannelManager = () => {
    const toast = useToast()
    const channelClient = new apiClient ('/chat/channels/');
    const channelById = (channelId: string) => new apiClient (`/chat/channels/${channelId}/`)
    const joinChannelClient = (channelId: string) => new apiClient (`/chat/channels/${channelId}/join/`)
    const leaveChannelClient = (channelId: string) => new apiClient (`/chat/channels/${channelId}/leave/`)
    const Success = useSuccess()
    const Failure = useFailure ()
    const queryClient = useQueryClient()
    const {setCurrentSection} = useContext (AppNavigationContext)

    const newChannelMutation = useMutation ({
        mutationFn: (channelBody: any) => channelClient.postData(channelBody),
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries('channels')
            toast(Success("Channel created successfully"))
        },
        onError: (error) => {
            console.log(error)
            toast(Failure("Channel creation failed"))
        }
    })

    const deleteChannelMutation = useMutation ({
        mutationFn: (channelId: string) => channelById(channelId).deleteData(),
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries('channels')
            setCurrentSection!("friends")   
            toast(Success("Channel deleted successfully"))
        },
        onError: (error) => {
            console.log(error)
            queryClient.invalidateQueries('channels')
            toast(Failure("Channel deletion failed"))
        }
    })

    const jointChannelMutation = useMutation ({
        mutationFn: (channel:any) => joinChannelClient(channel.channelId).postData({
            password: channel.password
        }),
        onSuccess: (data) =>{
            console.log(data)
            queryClient.invalidateQueries('channels')
            toast(Success("you joined channel"))
        },
        onError: (error) => {
            console.log(error)
            toast(Failure("Channel join failed"))
        }
    })

    const leaveChannelClientMutation = useMutation ({
        mutationFn: (channelId: string) => leaveChannelClient(channelId).deleteData (),
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries('channels')
            setCurrentSection!("friends")   
            toast(Success("you left channel"))
        },
        onError: (error) => {
            console.log(error)
            toast(Failure("Channel leave failed"))
        }
    })
    

    function createChannel (channelName:string, channelType:string ,channelAvatar:string, channlPass?:string, ){
        newChannelMutation.mutate({name: channelName, type: channelType, password: channlPass!, avatar: channelAvatar!})
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