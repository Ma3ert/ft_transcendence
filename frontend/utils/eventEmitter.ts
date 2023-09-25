import { Socket } from "socket.io-client";

export type EventName = string;
export type EventMessage = {
  username: string;
  userid: number;
  socketid: string;
};

export function EventEmitter(
  socket: Socket,
  eventName: EventName,
  message: EventMessage | string | ReadChatNotification
) {
  socket.emit(eventName, message);
}

export function NotifyServer(
  user: User,
  socket: Socket,
  socketEvent: EventName,
) {

  
  EventEmitter(socket, socketEvent, {
    username: user.username,
    userid: user.id,
    socketid: socket.id,
  });

}


export function EmitNotification(
  socket: Socket,
  socketEvent: EventName,
  message: EventMessage | string | ReadChatNotification 
) {
  EventEmitter(socket, socketEvent, message);
}