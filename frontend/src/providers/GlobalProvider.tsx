import React, { useEffect, useState } from "react";
import { GlobalContext } from "@/context/Contexts";
import { Socket } from "socket.io-client";
import { NotifyServer } from "../../utils/eventEmitter";
import { friendsList } from "../../contstants";
import useEventListener from "../../utils/EventListener";
import io from "socket.io-client";
import EventListener from "../../utils/EventListener";
interface GlobalContextProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalContextProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  
  useEffect(() => {
    const socketClient = io("http://localhost:3060", {
      autoConnect: false
    });

    socketClient.connect ()
    socketClient.on("connect", () => {
      console.log("connect");
      setSocket(socketClient);
      console.log(`client with socket id : ${socketClient.id} connected`);
      NotifyServer(friendsList[0],socketClient, "userLoggedIn");
      EventListener (socketClient,'checkNotification',  (msg:any)=>{
        console.log (`${msg} from server`)
      })
      socketClient.on("disconnect", () => {
        console.log("disconnect");
      });
    });

   
    
    return () => {
      socketClient.disconnect();
    };
  }, []);
  return (
    <GlobalContext.Provider
      value={{
        // add global state here
        socket,
        authenticated,
        setAuthenticated,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
