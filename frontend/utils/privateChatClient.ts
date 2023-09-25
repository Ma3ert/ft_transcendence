import io from "socket.io-client";
import { Socket } from "socket.io-client/debug";



export const SendMessage = (socket:Socket, message: string) => {
    
  socket!.emit("chat message", message);
  socket.disconnect();
};


// set up error event 

// set up reconnect event

// set up reconnect event 