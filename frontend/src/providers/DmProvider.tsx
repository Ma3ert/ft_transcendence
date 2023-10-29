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
import { useRouter } from "next/navigation";
interface DmProviderProps {
  children: React.ReactNode;
}

const DmProvider: React.FC<DmProviderProps> = ({ children }) => {
  const { activePeer, setActivePeer, friendsList } = useContext(UsersContext);
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const { socket } = useContext(GlobalContext);

  const { onOpen } = useContext(UsersContext);
  const dmClient = new apiClient(
    `chat/direct/${activePeer!.id}/messages?skip=0&take=500`
  );
  const { currentUser } = useAuth();
  const router = useRouter ()
  if (currentUser === undefined)
    router.push ("/")
  useQuery({
    queryKey: ["directMessages", activePeer!.id],
    queryFn: () => dmClient.getData().then((res) => res.data),
    onSuccess: (data: any) => {
      const reversed = data.slice().reverse();
      setMessages(reversed);
    },
    onError: (err: any) => {
      ////console.log (err)
    },
  });

  useEffect(() => {
    EventListener(socket!, "DM", (data) => {
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
    });
  }, [messages]);
  return (
    <DmContext.Provider value={{ messages }}>{children}</DmContext.Provider>
  );
};

export default DmProvider;
