import apiClient from "@/services/requestProcessor"
import { useMutation } from "react-query"
const useChannelSettingsManager = () => {


    const upgradeUserClient = (user:UserChannel) => new apiClient (`/chat/channels/${user.channelid}/upgrade/${user.userid}/`)
    const sentChannelEnviteClient = (user:UserChannel) => new apiClient (`/chat/channels/${user.channelid}/sent/${user.userid}`)
    const acceptChannelEnviteClient = (user:UserChannel) => new apiClient (`/chat/channels/${user.channelid}/accept`)
    const declineChannelEnviteClient = (user:UserChannel) => new apiClient (`/chat/channels/${user.channelid}/decline`)
    // const upgradeUserMutation = useMutation ({
    //     mutationFn: (user:any, channel:any) => upgradeUserClient(user, channel).postData(),
    //     onSuccess: (data) => console.log(data),
    //     onError: (error) => console.log(error)
    // })

    const sentChannelEnviteMutation = useMutation ({
        mutationFn: (user:UserChannel) => sentChannelEnviteClient(user).postData(null),
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error)
    })
    const acceptChannelEnviteMutation = useMutation ({
        mutationFn: (user:UserChannel) => acceptChannelEnviteClient(user).postData(null),
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error)
    })
    const declineChannelEnviteMutation = useMutation ({
        mutationFn: (user:UserChannel) => declineChannelEnviteClient(user).deleteData(),
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error)
    })

    const acceptProtectedEnviteMutation = useMutation ({
        mutationFn: (user:UserChannel) => acceptChannelEnviteClient(user).postData({password: user!.password}),
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error)
    })
    function sentChannelEnvite (user:UserChannel){
        sentChannelEnviteMutation.mutate(user)
    }

    function acceptChannelEnvite (user:UserChannel){
        acceptChannelEnviteMutation.mutate(user)
    }

    function declineChannelEnvite (user:UserChannel){
        declineChannelEnviteMutation.mutate(user)
    }

    function acceptProtectedEnvite (user:UserChannel){
        acceptProtectedEnviteMutation.mutate(user)
    }

    return {sentChannelEnvite, acceptChannelEnvite, declineChannelEnvite, acceptProtectedEnvite}
}

export default useChannelSettingsManager