import React, { useContext } from "react";
import ChatProvider from "@/providers/ChatProvider";
import ChatInterface from "@/components/ChatComponents/ChatInterface";
interface ChatProps {}

const Chat: React.FC<ChatProps> = ({}) => {

  return (

    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
   
  );
};
export default Chat;
