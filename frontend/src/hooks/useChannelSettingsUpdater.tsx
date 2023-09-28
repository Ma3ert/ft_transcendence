import apiClient from "@/services/requestProcessor"
import { useMutation } from "react-query"

const useChannelSettingsUpdater = () => {

    const upgrageUserClient = (user: UserChannel) => new apiClient (`/chat/channels/${user.channelid}/upgrade/${user.userid}/`)
    const downgradeUserClient = (user: UserChannel) => new apiClient (`/chat/channels/${user.channelid}/downgrade/${user.userid}/`)
    const setChannelPasswordClient = (user: UserChannel) => new apiClient (`/chat/channels/${user.channelid}/set-password/`)
    const removeChannelPasswordClient = (user: UserChannel) => new apiClient (`/chat/channels/${user.channelid}/remove-password/`)
    const changeChannelPasswordClient = (user: UserChannel) => new apiClient (`/chat/channels/${user.channelid}/change-password/`)


    const upgradeUserMutation = useMutation({
        mutationFn: (user: UserChannel) => upgrageUserClient(user).updateData (null,null),
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error)
    })

    const downgradeUserMutation = useMutation({
        mutationFn: (user: UserChannel) => downgradeUserClient(user).updateData (null,null),
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error)
    })

    const setChannelPasswordMutation = useMutation({
        mutationFn: (user: UserChannel) => setChannelPasswordClient(user).updateData (null,null),
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error)
    })

    const removeChannelPasswordMutation = useMutation({
        mutationFn: (user: UserChannel) => removeChannelPasswordClient(user).updateData (null,null),
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error)
    })

    const changeChannelPasswordMutation = useMutation({
        mutationFn: (user: UserChannel) => changeChannelPasswordClient(user).updateData (null,null),
        onSuccess: (data) => console.log(data),
        onError: (error) => console.log(error)
    })

    function upgradeUser (user: UserChannel){
        upgradeUserMutation.mutate(user)
    }
    function downgradeUser (user: UserChannel){
        downgradeUserMutation.mutate(user)
    }
    function setChannelPassword (user: UserChannel){
        setChannelPasswordMutation.mutate(user)
    }
    function removeChannelPassword (user: UserChannel){
        removeChannelPasswordMutation.mutate(user)
    }
    function changeChannelPassword (user: UserChannel){
        changeChannelPasswordMutation.mutate(user)
    }
    return {upgradeUser, downgradeUser, setChannelPassword, removeChannelPassword, changeChannelPassword}
}


export default useChannelSettingsUpdater