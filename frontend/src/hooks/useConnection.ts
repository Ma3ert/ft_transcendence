
import { useEffect } from "react";
import io from "socket.io-client";

const useConnection = (serverEndpoint:string) => {
  // const socket = io(serverEndpoint);

  // useEffect(() => {

  //   socket.on("connect", () => {
  //       console.log("connect");
  //       socket.on("disconnect", () => {
  //           console.log("disconnect");
  //       });
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // return socket;
};

export default useConnection;
