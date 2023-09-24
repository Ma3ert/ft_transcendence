import React, { useEffect, useState, useContext } from "react"
import { ChatContext, GlobalContext } from "@/context/Contexts"
import {friendsList, Channels, PRIVATE} from "../../contstants"
import { NotifyServer } from "../../utils/eventEmitter"
import { messages } from "../../contstants"
import EventListener from "../../utils/EventListener"
interface ChatProviderProps {
    children: React.ReactNode
}
const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {

    const [currentChat, setCurrentChat] = useState<ChatType>(PRIVATE)
    const [Friends, setFriends] = useState<User[]>(friendsList)
    const [directMessages, setDirectMessages] = useState<DirectMessage[]>(messages)
    const [ChannelsList, setChannels] = useState<Channel[]>([])
    const [activePeer, setActivePeer] = useState<User>(Friends[0])
    const [activeChannel, setActiveChannel] = useState<Channel>(Channels[0])
    const {socket} = useContext(GlobalContext)
  

    useEffect(() => {
        // fetch Peers
        // fetch Channels
        setFriends (friendsList)
        setChannels (Channels)
        console.log (`chat provider mounted socket id : ${socket?.id}`)
        NotifyServer (friendsList[0], socket, 'userIsActive');
        

        return () => {
            // emit user is not active event
            NotifyServer (friendsList[0], socket, 'userIsNotActive');
            // cleanup
            // cleanup event listeners
        }

    }, [])
    return <ChatContext.Provider value={{
        chatType: currentChat,
        setChatType: setCurrentChat,
        setActiveChannel,
        setActivePeer,
        Friends,
        Channels,
        activePeer,
        activeChannel,
        directMessages,
        setDirectMessages

    }}>{children}</ChatContext.Provider>
}

export default ChatProvider