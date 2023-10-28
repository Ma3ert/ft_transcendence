import {
  UserStatusContext,
  GlobalContext,
  UsersContext,
} from "@/context/Contexts";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";

interface Props {
  children?: React.ReactNode;
}
const UserStatusProvider: React.FC<Props> = ({ children }) => {
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const { socket } = useContext(GlobalContext);
  const { activePeer } = useContext(UsersContext);
  const {currentUser} = useAuth ()
  const router = useRouter ()

  
  
  useEffect(() => {
    if (currentUser === undefined)
      router.push ("/")
    if (socket)
    {
      socket!.emit("checkStatus", { userId: activePeer!.id });
      socket!.on("checkStatus", (res: any) => {
        if (res && res.userId === activePeer!.id) setUserStatus!(res);
      });

    }
  }, []);
  return (
    <UserStatusContext.Provider value={{ userStatus, setUserStatus }}>
      {children}
    </UserStatusContext.Provider>
  );
};

export default UserStatusProvider;
