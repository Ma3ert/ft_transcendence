import React, { useEffect, useState } from "react"
import { ChatContext } from "@/context/Contexts"
import {friendsList, Channels, PRIVATE} from "../../contstants"
import useConnection from "@/hooks/useConnection"
import { NotifyServer } from "@/services/eventEmitter"
interface ChatProviderProps {
    children: React.ReactNode
}
const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {

    // const [currentChat, setCurrentChat] = useState<ChatType>(PRIVATE)
    // const [Friends, setFriends] = useState<User[]>([])
    // const [ChannelsList, setChannels] = useState<Channel[]>([])
    // const [activePeer, setActivePeer] = useState<User>(Friends[0])
    // const [activeChannel, setActiveChannel] = useState<Channel>(Channels[0])
    // const socket = useConnection(process.env.REACT_APP_API_URL || 'http://localhost:3000')

    // useEffect(() => {
    //     // fetch Peers
    //     // fetch Channels
    //     setFriends (friendsList)
    //     setChannels (Channels)
    //     NotifyServer (friendsList[0], socket, 'userLoggedIn');
    //     return () => {
    //         // cleanup
    //         // cleanup event listeners
    //     }

    // }, [])
    // return <ChatContext.Provider value={{
    //     chatType: currentChat,
    //     setChatType: setCurrentChat,
    //     setActiveChannel,
    //     setActivePeer,
    //     Friends,
    //     Channels,
    //     activePeer,
    //     activeChannel

    // }}>{children}</ChatContext.Provider>
}

export default ChatProvider