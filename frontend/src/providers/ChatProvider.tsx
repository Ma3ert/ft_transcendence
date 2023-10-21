import React, { useEffect, useState, useContext } from "react";
import { AppNavigationContext, ChatContext, GlobalContext, UsersContext } from "@/context/Contexts";
import {Channels, PRIVATE } from "../../contstants";
import { NotifyServer } from "../../utils/eventEmitter";
import { messages } from "../../contstants";
import apiClient from "../services/requestProcessor";
import EventListener from "../../utils/EventListener";
import { useQuery } from "react-query";
interface ChatProviderProps {
  children: React.ReactNode;
}
const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [currentChat, setCurrentChat] = useState<ChatType>(PRIVATE);
  const [chatNotification, setChatNotification] = useState<boolean>(true);
  const [requestNotification, setRequestNotification] = useState<boolean>(true);
  const [directMessages, setDirectMessages] =
    useState<DirectMessage[]>([]);
  const [joinGameStatus, setJoinGameStatus] = useState<boolean>(false);
  const [activeChannelMembers, setActiveChannelMembers] = useState<User[]>([])
  const [activePeerStatus, setActivePeerStatus] = useState<boolean>(false)
  const [GameEnvitation, setGameEnvitation] = useState<GameEnvitation | null>(
    null
  );
  const { socket } = useContext(GlobalContext);
  const {setCurrentSection} = useContext (AppNavigationContext)
  const [channelConversations, setChannelConversations] = useState<string[]>([])
  const { setActivePeer } = useContext(UsersContext);
  const { friendsList } = useContext(UsersContext);
  const [DmNotifications, setDmNotifications] = useState<string[]>([]);
  const [CmNotifications, setCmNotifications] = useState<string[]>([]);
  const [gameInviteSender, setGameInviteSender] = useState<string>("");
 


  
  
  
  
  useEffect(() => {
    

    return () => {
      // emit user is not active event
      // cleanup
      // cleanup event listeners
    };
  }, []);


  
  return (
    <ChatContext.Provider
      value={{
        chatType: currentChat,
        setCurrentChat,
        directMessages,
        setDirectMessages,
        joinGameStatus,
        setJoinGameStatus,
        GameEnvitation,
        setGameEnvitation,
        chatNotification,
        requestNotification,
        channelConversations,
        setChannelConversations,
        DmNotifications,
        setDmNotifications,
        CmNotifications,
        setCmNotifications,
        gameInviteSender,
        setGameInviteSender,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
