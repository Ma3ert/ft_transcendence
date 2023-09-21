
import { useEffect } from "react";
import io from "socket.io-client";

const useSocket = (url:string) => {
  const socket = io(url);

  useEffect(() => {

    socket.on("connect", () => {
        console.log("connect");
        socket.on("disconnect", () => {
            console.log("disconnect");
        });
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
