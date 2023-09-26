import React, { useEffect, useState } from "react";
import { GlobalContext } from "@/context/Contexts";
import { Socket } from "socket.io-client";
import io from "socket.io-client";

interface GlobalContextProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalContextProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>(io("http://localhost:3000", {
    autoConnect: false,
  }));
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);
  
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("client connected");
      setConnected (true)
      setSocket(socket);
      socket.on("disconnect", () => {
        console.log("client disconnected");
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [authenticated]);
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
