'use client'
import React, { useEffect, useState } from "react";
import { GlobalContext } from "@/context/Contexts";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { useRef } from "react";

interface GlobalContextProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalContextProps> = ({ children }) => {
 
  const [socket, setSocket] = useState<Socket | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    // socket.connect();
    
  }, [authenticated]);
  return (
    <GlobalContext.Provider
      value={{
        // add global state here
        socket,
        setSocket,
        authenticated,
        setAuthenticated,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
