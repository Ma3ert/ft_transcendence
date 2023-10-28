import React, { useContext } from "react";
import ChatProvider from "@/providers/ChatProvider";
import ChatInterface from "@/components/ChatComponents/ChatInterface";
interface ChatProps {}
import { useEffect } from "react";
import { ChatContext, GlobalContext, UsersContext } from "@/context/Contexts";
import { NotifyServer } from "../../../utils/eventEmitter";
import { CHANNEL, PRIVATE } from "../../../contstants";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const Chat: React.FC<ChatProps> = ({}) => {
  const { chatType, setCmNotifications, setDmNotifications } =
    useContext(ChatContext);
  const { socket } = useContext(GlobalContext);
  const { currentUser } = useAuth();
  const router = useRouter ()

  
  useEffect(() => {
    if (currentUser == undefined)
      router.push ("/")
    else
    {
      const type = chatType == CHANNEL ? "channelMessage" : "directMessage";
      if (socket)
      {
        NotifyServer(socket!, "userIsActive", currentUser!.user!);
        socket!.on("ChatNotification", (message: ChatNotification) => {
          setDmNotifications!(message.DM);
          setCmNotifications!(message.CM);
      });
      }
    }

    //   NotifyServer (socket!, "userIsInChannel", currentUser!.user!)
    return () => {
      ////console.log ('user in inactive')
      NotifyServer(socket!, "userIsNotActive", currentUser!.user!);
    };
  }, []);
  return <ChatInterface />;
};
export default Chat;
