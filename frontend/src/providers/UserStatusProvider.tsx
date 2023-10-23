import { UserStatusContext, GlobalContext, UsersContext } from "@/context/Contexts";
import { useState , useEffect, useContext} from "react";

interface Props {
    children?: React.ReactNode;
}
const UserStatusProvider :React.FC<Props> = ({children}) =>{
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const { socket } =   useContext(GlobalContext);
  const {activePeer} = useContext (UsersContext)

  useEffect(() => {
    socket!.emit("checkStatus", { userId: activePeer!.id });
    socket!.on("checkStatus", (res:any) => {
      console.log("status");
      console.table(res);
      if (res && res.userId === activePeer!.id)
        setUserStatus!(res);
    });
  }, []);
    return (<UserStatusContext.Provider value={{userStatus, setUserStatus}}>
        {children}
    </UserStatusContext.Provider>)
}

export  default UserStatusProvider;