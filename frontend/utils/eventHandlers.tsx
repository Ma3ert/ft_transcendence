import { Socket } from "socket.io-client";

export const SendMessage = (
  socket: Socket,
  message: DirectMessage | ChannelMessage,
  event: EventName
) => {
  if (socket)
    socket!.emit(event, message);
};


