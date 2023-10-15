import { useContext } from "react";
import { GlobalContext, ChatContext } from "@/context/Contexts";
import { Socket } from "socket.io-client";

const EventListener = (
  socket: Socket,
  event: EventName,
  action: (value: any) => void
) => {
  socket.on(event, (msg: any) => {
    action(msg);
  });
};

export default EventListener;
