import React, { useState, useEffect } from "react";
import { Button, FormControl, HStack, Input , Image} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { TbArrowBigRightFilled } from "react-icons/tb";
import { SendMessage} from '../../../utils/privateChatClient'
import { Socket, io } from "socket.io-client";
import useSocket from "@/hooks/useConnection";

interface ChatInputBoxProps {
  // socket: Socket;
}
const ChatInputBox: React.FC<ChatInputBoxProps> = ({}) => {

  const [message, setMessage] = useState("");
  const socket:Socket = useSocket('http://localhost:3060');

    socket.on('chat message', (msg) => {
      alert(msg)
    })
  
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
        bg="#5B6171"
        color="#1D222C"
        borderRadius={"50%"}
        _hover={{ opacity: 0.8 }}
        _active={{ background: "#fff", color: "#DC585B" }}
        p={2}
        fontSize={"sm"}
        fontWeight={"bold"}
        onClick={() => {
          socket.emit ('chat message', message)
          // socket.emit('privateMessage', {message: message, to: '60f9b1b9e9b9c2a4e8b9e0a4', from: '60f9b1b9e9b9c2a4e8b9e0a4'})
          setMessage("");
        }}
      >
        <Icon as={TbArrowBigRightFilled} />
      </Button>
    </HStack>
  );
};

export default ChatInputBox;
