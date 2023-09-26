import React, { useEffect, useState, useContext } from "react";
import { ChatContext, GlobalContext, UsersContext } from "@/context/Contexts";
import { friendsList, Channels, PRIVATE } from "../../contstants";
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
  const [Friends, setFriends] = useState<User[]>(friendsList);
  const [directMessages, setDirectMessages] =
    useState<DirectMessage[]>(messages);
  const [ChannelsList, setChannels] = useState<Channel[]>([]);
  const [activePeer, setActivePeer] = useState<User>(Friends[0]);
  const [activeChannel, setActiveChannel] = useState<Channel>(Channels[0]);
  const [joinGameStatus, setJoinGameStatus] = useState<boolean>(false);
  const [GameEnvitation, setGameEnvitation] = useState<GameEnvitation | null>(
    null
  );
  const { socket } = useContext(GlobalContext);
  const {loggedInUser, Users} = useContext (UsersContext)
  

  
 

  useEffect(() => {
    // fetch Peers
    // fetch Channels
    const friends = Users!.filter(user => user.id !== loggedInUser!.id)
    setFriends(friends)
    setChannels(Channels);
    console.log(`chat provider mounted socket id : ${socket?.id}`);
    NotifyServer(socket, "userIsActive", loggedInUser!);
    

    return () => {
      // emit user is not active event
      NotifyServer(socket, "userIsNotActive", loggedInUser!);
      // cleanup
      // cleanup event listeners
    };
  }, []);


  
  return (
    <ChatContext.Provider
      value={{
        chatType: currentChat,
        setChatType: setCurrentChat,
        setActiveChannel,
        setActivePeer,
        Friends,
        Channels,
        activePeer,
        activeChannel,
        directMessages,
        setDirectMessages,
        joinGameStatus,
        setJoinGameStatus,
        GameEnvitation,
        setGameEnvitation,
        chatNotification,
        requestNotification
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
