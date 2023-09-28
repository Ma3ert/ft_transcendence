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
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYmFiMGVkOS05YWIwLTQ0NzgtOTFiMC1hMDAyNzJjNzhiOGEiLCJ1c2VybmFtZSI6InllbGF0bWFuIiwiaWF0IjoxNjk1ODk0NjIxLCJleHAiOjE2OTY0OTk0MjF9.t7aPLQg09ZtIeW1t13SrJ0LmbHwaTlTPEfhRmiK-BFoeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjYmFiMGVkOS05YWIwLTQ0NzgtOTFiMC1hMDAyNzJjNzhiOGEiLCJ1c2VybmFtZSI6InllbGF0bWFuIiwiaWF0IjoxNjk1ODk0NjIxLCJleHAiOjE2OTY0OTk0MjF9.t7aPLQg09ZtIeW1t13SrJ0LmbHwaTlTPEfhRmiK-BFo';
  const socketRef = useRef<Socket>(io("ws://localhost:3000/", {
      // autoConnect: false,
      transports: ["websocket", "polling"],
      closeOnBeforeunload: true,
      // reconnection: false,
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
  const [socket, setSocket] = useState<Socket>(
    socketRef.current);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    // socket.connect();
    socketRef.current.on("connect", () => {
      console.log("client connected");
      setConnected(true);
      socketRef.current.on("disconnect", () => {
        console.log("client disconnected");
      });
    });

    socketRef.current.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      socketRef.current.disconnect();
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
