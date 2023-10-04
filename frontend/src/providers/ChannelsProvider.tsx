import { ChannelsContext } from "@/context/Contexts"
import { useEffect, useState, useContext } from "react"
import { useQuery } from "react-query"
import apiClient from "../services/requestProcessor"

interface ChannelsProviderProps {
    children: React.ReactNode
}
const ChannelsProvider:React.FC<ChannelsProviderProps> = ({ children }) => 
{
    const [Channels, setChannels] = useState<Channel[]>([])
    const [activeChannel, setActiveChannel] = useState<Channel | null>(null)
    const [activeChannelMembers, setActiveChannelMembers] = useState<User[]>([])
    const [channelConversations, setChannelConversations] = useState<string[]>([])
    const userChannelsClient = new apiClient('/chat/channels/')


    useQuery ('channels', {
        queryFn: () => userChannelsClient.getData().then(res => res.data),
        onSuccess: (data:Channel[]) => {
            setChannels(data)
        },
        onError: (err) => {
            console.log(err)
        }
    })

    

    useEffect (() => {
        // fetch channels
        // fetch active channel
        // fetch active channel members
        // fetch channel conversations
    }, [])
    return <ChannelsContext.Provider value={{Channels, activeChannel, setActiveChannel}}>
        {children}
    </ChannelsContext.Provider>
}

export default ChannelsProvider