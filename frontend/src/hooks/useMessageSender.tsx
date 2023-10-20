import { useContext } from "react";
import { ChatContext, GlobalContext, UsersContext } from "../context/Contexts";
import { PRIVATE, loggedIndUser } from "../../contstants";
import { SendMessage } from "../../utils/eventHandlers";
import { Socket } from "socket.io-client";
import { useAuth } from "./useAuth";

const useMessageSender = (
  socket: Socket,
  activePeer: User,
  chatType: boolean,
  activeChannel: Channel
) => {
  const {currentUser} = useAuth ()
  return (message?: string) => {
    if (chatType == PRIVATE) {
      if (message)
        SendMessage(
          socket!,
          {
            message: message,
            senderId: currentUser!.id,
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
            senderId: currentUser!.id,
            game: true,
          },
          "DM"
        );
      }
    } else {
      const messageBody: ChannelMessage = {
        message: message!,
        channelId: activeChannel!.id!,
        senderId: currentUser!.id,
      };
      SendMessage(socket!, messageBody, "CM");
    }
  };
};

export default useMessageSender;
