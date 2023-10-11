import React, { useState, useEffect, useContext } from "react";
import { Button, FormControl, HStack, Input, Image } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { TbArrowBigRightFilled } from "react-icons/tb";
import { Socket, io } from "socket.io-client";
import { ChatContext, GlobalContext, UsersContext } from "@/context/Contexts";
import { SendMessage } from "../../../utils/eventHandlers";
import { PRIVATE, loggedIndUser } from "../../../contstants";
import useMessageSender from "@/hooks/useMessageSender";
interface ChatInputBoxProps {
  // socket: Socket;
}
const ChatInputBox: React.FC<ChatInputBoxProps> = ({}) => {
  const [message, setMessage] = useState("");
  const {
    joinGameStatus,
    setJoinGameStatus,
    chatType,
    activeChannel,
  } = useContext(ChatContext);
  const {activePeer} = useContext (UsersContext)
  const { socket } = useContext(GlobalContext);
  const SendMessage = useMessageSender(socket, activePeer!, chatType!, activeChannel!);

  return (
    <HStack
      borderRadius={"29px"}
      bg="#252932"
      justify={"space-between"}
      alignItems={"center"}
      w="98%"
      px={4}
      py={2}
    >
      <Button
        isDisabled={joinGameStatus}
        onClick={() => {
          
          // setJoinGameStatus! (true);
          console.log("sending game invitation");
          // SendMessage();
        }}
        bg="transparent"
        border="none"
        outline={"none"}
        _hover={{ opacity: 0.8 }}
        _active={{ transform: "scale(1.1)" }}
      >
        <Image src={"/LightSolidLogo.png"} alt={"envite"} w={6} h={"auto"} />
      </Button>

      <FormControl flex={1}>
        <Input
          value={message}
          isDisabled={joinGameStatus}
          type="text"
          bg={"transparent"}
          color="white"
          _active={{ outline: "none", border: "none", boxShadow: "none" }}
          p={2}
          _focus={{ outline: "none", border: "none", boxShadow: "none" }}
          placeholder="Type a message ..."
          outline="none"
          border="none"
          w="100%"
          onChange={(e) => setMessage(e.target.value)}
          _placeholder={{ color: "#5B6171" }}
        />
      </FormControl>
      <Button
        isDisabled={joinGameStatus}
        bg="#5B6171"
        color="#1D222C"
        borderRadius={"50%"}
        _hover={{ opacity: 0.8 }}
        _active={{ background: "#fff", color: "#DC585B" }}
        p={2}
        fontSize={"sm"}
        fontWeight={"bold"}
        onClick={() => {
          SendMessage(message);
          setMessage("");
        }}
      >
        <Icon as={TbArrowBigRightFilled} />
      </Button>
    </HStack>
  );
};

export default ChatInputBox;
