import { ChatContext, DmContext, GlobalContext, UsersContext } from "@/context/Contexts";
import { useContext, useState } from "react";
import apiClient from "../services/requestProcessor";
import { useQuery } from "react-query";
import { useEffect } from "react";
import EventListener from "../../utils/EventListener";
interface DmProviderProps {
    children: React.ReactNode;
}


const DmProvider: React.FC<DmProviderProps> = ({children}) => {
  const { activePeer, setActivePeer , friendsList} = useContext(UsersContext);
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const {socket} = useContext (GlobalContext)
  const {setJoinGameStatus, setGameInviteSender} = useContext (ChatContext)
  const dmClient = new apiClient(
    `chat/direct/${activePeer!.id}/messages?skip=0&take=500`
  );
  useQuery ({
    queryKey: ["directMessages", activePeer!.id],
    queryFn:()=> dmClient.getData ().then (res=>res.data),
    onSuccess: (data:any)=>{
      const reversed = data.slice ().reverse ()
      setMessages (reversed)
    },
    onError: (err:any)=>{
      console.log (err)
    }
  })

  useEffect (()=>{
    EventListener (socket!, "DM", (data)=>{
      console.table (data)
      if (data.game)
      {
        console.log ('user has invited you to game')
        setJoinGameStatus (true)
        setGameInviteSender (data.senderId)
      }
      else 
      {
        const dm:DirectMessage = 
        {
          senderId: data.senderId,
          receiverId: data.receiverId,
          message: data.message,
        }
        const dms = Array.from (messages)
        dms!.push (dm)
        setMessages (dms!)
      }
      })
  }, [messages])
  return <DmContext.Provider value={{messages}}>{children}</DmContext.Provider>;
};


export default DmProvider;