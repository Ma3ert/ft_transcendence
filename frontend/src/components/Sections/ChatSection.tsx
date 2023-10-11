import React, { useContext } from "react";
import ChatProvider from "@/providers/ChatProvider";
import ChatInterface from "@/components/ChatComponents/ChatInterface";
interface ChatProps {}
import { useEffect } from "react";
import { ChatContext, GlobalContext, UsersContext } from "@/context/Contexts";
import { NotifyServer } from "../../../utils/eventEmitter";
import { CHANNEL, PRIVATE } from "../../../contstants";

const Chat: React.FC<ChatProps> = ({}) => {
  const { chatType } = useContext(ChatContext);
  const {socket}  = useContext (GlobalContext)
  const {loggedInUser}  = useContext (UsersContext)

  useEffect (()=>{
      const type = chatType == CHANNEL ? "channelMessage" : "directMessage"
       console.log (type)
       if (chatType == PRIVATE)
        NotifyServer (socket!, "userIsActive", loggedInUser!)
      // if (chatType == CHANNEL)
      //   NotifyServer (socket!, "userIsInChannel", loggedInUser!)
  }
  ,[])
  return <ChatInterface />;
};
export default Chat;
