import { Socket } from "socket.io-client";



export function EventEmitter(
  socket: Socket,
  eventName: EventName,
  message: EventMessage | ServerNotificationMessage | string
) {
  if (socket)
  socket!.emit(eventName, message);
}

export function NotifyServer(
  socket: Socket,
  socketEvent: EventName,
  user?: User, 
  channel?:boolean,
  activeChannel?: Channel
) {

  if (activeChannel) 
    EventEmitter(socket, socketEvent, {
    channel: channel!,
    id: activeChannel.id,
  });
  else
  EventEmitter(socket, socketEvent, {
    username: user!.username,
    userid: user!.id,
  });

}


