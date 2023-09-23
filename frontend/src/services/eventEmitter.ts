import * as SocketIOClient from "socket.io-client";

export function EventEmitter(
  socket: SocketIOClient.Socket,
  eventName: EventName,
  message: EventMessage
) {
  socket.emit(eventName, message);
}

export function NotifyServer(
  user: User,
  socket: SocketIOClient.Socket,
  socketEvent: EventName
) {
  EventEmitter(socket, socketEvent, {
    username: user.username,
    userid: user.id,
    socketid: socket.id,
  });
}


