import React, { useEffect, useState } from "react"
import { ChatContext } from "@/context/Contexts"
import {friendsList, Channels, PRIVATE} from "../../contstants"

interface ChatProviderProps {
    children: React.ReactNode
}
const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {

    const [currentChat, setCurrentChat] = useState<ChatType>(PRIVATE)
    const [Friends, setFriends] = useState<User[]>([])
    const [ChannelsList, setChannels] = useState<Channel[]>([])
    const [activePeer, setActivePeer] = useState<User>(Friends[0])
    const [activeChannel, setActiveChannel] = useState<Channel>(Channels[0])

    useEffect(() => {
        // fetch Peers
        // fetch Channels
        setFriends (friendsList)
        setChannels (Channels)
    }, [])
    return <ChatContext.Provider value={{
        chatType: currentChat,
        setChatType: setCurrentChat,
        setActiveChannel,
        setActivePeer,
        Friends,
        Channels,
        activePeer,
        activeChannel

    }}>{children}</ChatContext.Provider>
}

export default ChatProvider