import { Socket } from "socket.io-client";

export const SendMessage = (socket:Socket, message: DirectMessage, event:EventName) => {
    socket.emit(event, message);
  }