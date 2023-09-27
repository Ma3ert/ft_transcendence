import { useContext } from "react";
import { ChatContext, GlobalContext, UsersContext } from "../context/Contexts";
import { PRIVATE, loggedIndUser } from "../../contstants";
import { SendMessage } from "../../utils/eventHandlers";
import { Socket } from "socket.io-client";

const useMessageSender = (
  socket: Socket,
  activePeer: User,
  chatType: boolean,
  activeChannel: Channel
) => {
  const { loggedInUser } = useContext(UsersContext);
  return (message?: string) => {
    if (chatType == PRIVATE) {
      if (message)
        SendMessage(
          socket!,
          { message: message, from: loggedInUser!.id, to: activePeer!.id },
          "directMessage"
        );
      else {
        SendMessage(
          socket!,
          {
            message: message,
            to: activePeer!.id,
            from: loggedInUser!.id,
            game: true,
          },
          "directMessage"
        );
      }
    } else {
      const messageBody: ChannelMessage = {
        message: message,
        channelid: activeChannel!.id!,
        from: loggedInUser!.id,
      };
      SendMessage(socket!, messageBody, "channelMessage");
    }
  };
};

export default useMessageSender;