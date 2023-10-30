"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context/Contexts";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { useRef } from "react";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/useAuth";
import { NotifyServer } from "../../utils/eventEmitter";
import { useRouter } from "next/navigation";

interface GlobalContextProps {
  children: React.ReactNode;
}

const GlobalProvider: React.FC<GlobalContextProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const router = useRouter ()
  const [counter, setCounter] = useState <number>(0)

  useEffect(() => {
    const socket = io("http://e1r9p3.1337.ma:3000/chat", {
      autoConnect: false,
      transports: ["websocket", "polling"],
    });
    const token = Cookies.get("jwt");
    socket.auth = { token: `Bearer ${token}` };
    socket.connect();
    setSocket!(socket);
    socket.on("connect", () => {
      console.log ('client connected')
      NotifyServer(socket, "userLoggedIn", currentUser!.user!);
      socket.on("disconnect", () => {
        console.log ('client disconnected')
      });
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
      if (currentUser)
        setCounter (counter+1);
    });

    return () => {
      socket.disconnect();
    };
  }, [counter]);
  return (
    <GlobalContext.Provider
      value={{
        // add global state here
        socket,
        setSocket,
        authenticated,
        setAuthenticated,
        counter, 
        setCounter
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
