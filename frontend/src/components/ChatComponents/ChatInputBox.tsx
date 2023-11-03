import React, { useState, useEffect, useContext, FormEvent } from "react";
import { Button, FormControl, HStack, Input, Image } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { TbArrowBigRightFilled } from "react-icons/tb";
import { Socket, io } from "socket.io-client";
import gameSocket from "../GameComponents/socket";
import {
  ChannelsContext,
  ChatContext,
  GlobalContext,
  MembersContext,
  UsersContext,
} from "@/context/Contexts";
import { CHANNEL, PRIVATE, loggedIndUser } from "../../../contstants";
import useMessageSender from "@/hooks/useMessageSender";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
interface ChatInputBoxProps {
  // socket: Socket;
  members?:Member[]
}
const ChatInputBox: React.FC<ChatInputBoxProps> = ({
  members
}) => {
  const [message, setMessage] = useState("");
  const {inviteStatus, setInviteStatus} = useContext (UsersContext)
  const { chatType } =
    useContext(ChatContext);
  const { activePeer } = useContext(UsersContext);
  const {currentUser} = useAuth ()
  const router = useRouter ()
  const { socket } = useContext(GlobalContext);
  const { activeChannel } = useContext(ChannelsContext);

  const SendMessage = useMessageSender(
    socket,
    activePeer!,
    chatType!,
    activeChannel!
  );
  const currentMemeber = members?.find(
    (item) => item.user === currentUser!.user.id
  );

  const handleSendMessage = (e?: FormEvent) => {
    e && e!.preventDefault();

    if (message === "") return;
    if (chatType === PRIVATE) SendMessage(message);
    else {
      if (!currentMemeber?.banned && !currentMemeber?.muted) {
        socket.emit("CM", {
          senderId: currentUser!.user.id,
          channelId: activeChannel!.id,
          message: message,
        });
      }
    }
    setMessage("");
  };

 

  if (currentUser  === undefined || !socket)
    router.push ('/')
  useEffect(() => {   
  }, [activeChannel, activePeer, members]);
  return (
    <HStack
      borderRadius={"29px"}
      bg="#252932"
      justify={"space-between"}
      alignItems={"center"}
      w="98%"
      px={4}
      py={2}
      fontFamily={"visbyRound"}
    >
      {chatType === PRIVATE && (
        <Button
          isDisabled={inviteStatus}
          onClick={() => {
            if (gameSocket)
            {
              gameSocket!.emit ("gameSendInvite", { user: activePeer!.id})
            }
            ////console.log("sending game invitation");
          }}
          bg="transparent"
          border="none"
          outline={"none"}
          _hover={{ opacity: 0.8 }}
          _active={{ transform: "scale(1.1)" }}
        >
          <Image src={"/LightSolidLogo.png"} alt={"envite"} w={6} h={"auto"} />
        </Button>
      )}

      <FormControl flex={1}>
        <form onSubmit={(e) => handleSendMessage(e)}>
          <Input
            value={message}
            type="text"
            bg={"transparent"}
            color="#5B6171"
            _active={{ outline: "none", border: "none", boxShadow: "none" }}
            p={2}
            _focus={{ outline: "none", border: "none", boxShadow: "none" }}
            placeholder="Type a message ..."
            outline="none"
            border="none"
            w="100%"
            onChange={(e) => setMessage(e.target.value)}
            _placeholder={{ color: "#5B6171" , opacity:'0.4'}}
          />
        </form>
      </FormControl>
      <Button
        bg="#5B6171"
        color="#1D222C"
        borderRadius={"50%"}
        _hover={{ opacity: 0.8 }}
        _active={{ background: "#fff", color: "#DC585B" }}
        p={2}
        fontSize={"sm"}
        fontWeight={"bold"}
        onClick={() => handleSendMessage()}
      >
        <Icon as={TbArrowBigRightFilled} />
      </Button>
    </HStack>
  );
};

export default ChatInputBox;
