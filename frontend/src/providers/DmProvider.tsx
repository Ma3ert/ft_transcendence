import {
  ChatContext,
  DmContext,
  GlobalContext,
  UsersContext,
} from "@/context/Contexts";
import { useContext, useState } from "react";
import apiClient from "../services/requestProcessor";
import { useQuery } from "react-query";
import { useEffect } from "react";
import EventListener from "../../utils/EventListener";
import DirectMessages from "@/components/ChatComponents/DirectMessages";
import { useAuth } from "@/hooks/useAuth";
interface DmProviderProps {
  children: React.ReactNode;
}

const DmProvider: React.FC<DmProviderProps> = ({ children }) => {
  const { activePeer, setActivePeer, friendsList } = useContext(UsersContext);
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const { socket } = useContext(GlobalContext);
  const { setJoinGameStatus, setGameInviteSender } = useContext(ChatContext);
  const { onOpen } = useContext(UsersContext);
  const dmClient = new apiClient(
    `chat/direct/${activePeer!.id}/messages?skip=0&take=500`
  );
  const { currentUser } = useAuth();
  useQuery({
    queryKey: ["directMessages", activePeer!.id],
    queryFn: () => dmClient.getData().then((res) => res.data),
    onSuccess: (data: any) => {
      const reversed = data.slice().reverse();
      setMessages(reversed);
    },
    onError: (err: any) => {
      //console.log (err)
    },
  });

  useEffect(() => {
    EventListener(socket!, "DM", (data) => {
      console.table(data);
      if (data.game) {
        // setJoinGameStatus! (true);
        setGameInviteSender!(data.senderId);
        onOpen!();
        console.log ('user has invited you to game')
      } else {
        const dm: DirectMessage = {
          senderId: data.senderId,
          receiverId: data.receiverId,
          message: data.message,
        };
        const dms = Array.from(messages);
        if (
          activePeer?.id === dm.senderId ||
          currentUser!.user!.id === dm.senderId
        ) {
          dms!.push(dm);
          setMessages(dms!);
        }
      }
    });
  }, [messages]);
  return (
    <DmContext.Provider value={{ messages }}>{children}</DmContext.Provider>
  );
};

export default DmProvider;
