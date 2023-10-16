'use client'
import React, { useEffect, useState } from "react";
import { GlobalContext } from "@/context/Contexts";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { useRef } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/useAuth";
import { NotifyServer } from "../../utils/eventEmitter";


interface GlobalContextProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalContextProps> = ({ children }) => {
 
  const [socket, setSocket] = useState<Socket | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const socket = io("http://localhost:3000/chat", {
      autoConnect: false,
      transports: ["websocket", "polling"],
      // closeOnBeforeunload: true,
      // reconnection: false,
    });

    const token = Cookies.get("jwt");
    socket.auth = { token: `Bearer ${token}` };
    console.log(`jwt token : ${token}`);
    socket.connect();
    setSocket!(socket);
    socket.on("connect", () => {
      console.log("client connected");
      NotifyServer(socket, "userLoggedIn", currentUser);
      socket.on("disconnect", () => {
        console.log("client disconnected");
      });
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      // socket.disconnect();
    };
  }, []);
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
