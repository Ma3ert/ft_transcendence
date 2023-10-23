import React, { useContext } from "react";
import ChatProvider from "@/providers/ChatProvider";
import ChatInterface from "@/components/ChatComponents/ChatInterface";
interface ChatProps {}
import { useEffect } from "react";
import { ChatContext, GlobalContext, UsersContext } from "@/context/Contexts";
import { NotifyServer } from "../../../utils/eventEmitter";
import { CHANNEL, PRIVATE } from "../../../contstants";
import { useAuth } from "@/hooks/useAuth";

const Chat: React.FC<ChatProps> = ({}) => {
  const { chatType , setCmNotifications, setDmNotifications} = useContext(ChatContext);
  const {socket}  = useContext (GlobalContext)
  const {currentUser} = useAuth ()

  useEffect (()=>{
      const type = chatType == CHANNEL ? "channelMessage" : "directMessage"
      console.log (type)
      NotifyServer (socket!, "userIsActive", currentUser!.user!)
      socket!.on ('ChatNotification', (message: ChatNotification) => {
        console.log ('chat notifications')
        console.log (message)
        setDmNotifications! (message.DM)
        setCmNotifications! (message.CM)
      })
      
      

      //   NotifyServer (socket!, "userIsInChannel", currentUser!.user!)
    return ()=>{
      console.log ('user in inactive')  
          NotifyServer (socket!, "userIsNotActive", currentUser!.user!)
    }
  }
  ,[])
  return <ChatInterface />;
};
export default Chat;
