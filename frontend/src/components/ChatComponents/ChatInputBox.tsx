import React, { useState, useEffect , useContext} from "react";
import { Button, FormControl, HStack, Input , Image} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { TbArrowBigRightFilled } from "react-icons/tb";
import { Socket, io } from "socket.io-client";
import { ChatContext, GlobalContext } from "@/context/Contexts";
import {SendMessage} from "../../../utils/eventHandlers";
interface ChatInputBoxProps {
  // socket: Socket;
  gameInvitation?: GameInvitation;
  setGameInvitation?: React.Dispatch<GameInvitation | null>;
}
const ChatInputBox: React.FC<ChatInputBoxProps> = ({gameInvitation, setGameInvitation}) => {

  const [message, setMessage] = useState("");
  const {activePeer} = useContext (ChatContext)
  const {socket} = useContext (GlobalContext)
  
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

        isDisabled={gameInvitation ? true : false}
        onClick={() => {
          const messageBody = {
            message: message,
            to:activePeer!.id,
            from:0,
            game:true
          }
          SendMessage (socket, messageBody , "directMessage")
        }}
        bg="transparent"
        border='none'
        outline={"none"}
        _hover={{ opacity: 0.8 }}
        _active={{transform:'scale(1.1)'}}
        >
          <Image src={'/LightSolidLogo.png'} alt={'envite'} w={6} h={'auto'}  />
        </Button>

      <FormControl flex={1}>
        <Input
          value={message}
          isDisabled={gameInvitation ? true : false}
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
        isDisabled={gameInvitation ? true : false}
        bg="#5B6171"
        color="#1D222C"
        borderRadius={"50%"}
        _hover={{ opacity: 0.8 }}
        _active={{ background: "#fff", color: "#DC585B" }}
        p={2}
        fontSize={"sm"}
        fontWeight={"bold"}
        onClick={() => {
          const messageBody = {
            message: message,
            to:activePeer!.id,
            from:0
          }
          SendMessage (socket, messageBody , "directMessage")
          setMessage("");
        }}
      >
        <Icon as={TbArrowBigRightFilled} />
      </Button>
    </HStack>
  );
};

export default ChatInputBox;
