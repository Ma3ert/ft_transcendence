import {
  ChatContext,
  DmContext,
  GlobalContext,
  UsersContext,
} from "@/context/Contexts";
import { useContext, useState } from "react";
import apiClient from "../services/requestProcessor";
import { useQuery } from "@tanstack/react-query";
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

  const { currentUser } = useAuth();

  return (
    <DmContext.Provider value={{ messages, setMessages }}>
      {children}
    </DmContext.Provider>
  );
};

export default DmProvider;
