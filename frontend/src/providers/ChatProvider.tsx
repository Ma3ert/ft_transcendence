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
    useState<DirectMessage[]>(messages);
  const [joinGameStatus, setJoinGameStatus] = useState<boolean>(false);
  const [activeChannelMembers, setActiveChannelMembers] = useState<User[]>([])
  const [activePeerStatus, setActivePeerStatus] = useState<boolean>(false)
  const [GameEnvitation, setGameEnvitation] = useState<GameEnvitation | null>(
    null
  );
  const { socket } = useContext(GlobalContext);
  const {setCurrentSection} = useContext (AppNavigationContext)
  const {loggedInUser, Users} = useContext (UsersContext)
  const [privateConversations, setPrivateConversations] = useState<string[]>([])
  const [channelConversations, setChannelConversations] = useState<string[]>([])
  

  
 

  useEffect(() => {
    // fetch Peers
    // fetch Channels
    const friends = Users!.filter(user => user.id !== loggedInUser!.id)
    console.log(`chat provider mounted socket id : ${socket?.id}`);
    // NotifyServer(socket, "userIsActive", loggedInUser!);
    

    return () => {
      // emit user is not active event
      // NotifyServer(socket, "userIsNotActive", loggedInUser!);
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
        privateConversations,
        channelConversations,
        setPrivateConversations,
        setChannelConversations,

      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
