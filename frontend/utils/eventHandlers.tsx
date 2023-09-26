import { Socket } from "socket.io-client";

export const SendMessage = (
  socket: Socket,
  message: DirectMessage | ChannelMessage,
  event: EventName
) => {
  socket!.emit(event, message);
};


