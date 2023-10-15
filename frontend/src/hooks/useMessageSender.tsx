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
          {
            message: message,
            senderId: loggedInUser!.id,
            receiverId: activePeer!.id,
            game: false,
          },
          "DM"
        );
      else {
        SendMessage(
          socket!,
          {
            message: message!,
            receiverId: activePeer!.id,
            senderId: loggedInUser!.id,
            game: true,
          },
          "DM"
        );
      }
    } else {
      const messageBody: ChannelMessage = {
        message: message!,
        channelId: activeChannel!.id!,
        senderId: loggedInUser!.id,
      };
      SendMessage(socket!, messageBody, "CM");
    }
  };
};

export default useMessageSender;
