import React, { useEffect, useRef, useState, useContext } from "react";
import { Stack, Text, HStack } from "@chakra-ui/react";
import { friendsList, loggedIndUser, messages } from "../../../contstants";
import MessageStack from "./MessageStack";
import ChatInputBox from "./ChatInputBox";
import { Avatar } from "@chakra-ui/react";
import FriendSettingsMenu from "./FriendSettingsMenu";
import { ChatContext } from "../../context/Contexts";
import { PRIVATE } from "../../../contstants";
import { NotifyServer } from "../../../utils/eventEmitter";
import { GlobalContext } from "@/context/Contexts";
import EventListener from "../../../utils/EventListener";

interface ChatBoxProps {}
const ChatBox: React.FC<ChatBoxProps> = ({}) => {
  const { activeChannel, activePeer,setActivePeer, Friends, chatType} = useContext(ChatContext);
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>(messages)
  const {socket} = useContext(GlobalContext)
  const [GameInvitation, setGameInvitation] = useState<GameInvitation | null> (null);


  const handleGameMessage = (msg:DirectMessage) => {
    if (msg.from == loggedIndUser.id) {
      // show game invitation
      if (msg.to != activePeer?.id)
        setActivePeer! (Friends!.find (friend => friend.id == msg.to)!);
    }
    else if (msg.to == loggedIndUser.id) {
      // show game invitation
      if (msg.from != activePeer?.id)
        setActivePeer! (Friends!.find (friend => friend.id == msg.from)!);
    }
    setGameInvitation ({from:msg.from!, to:msg.to!});
  }

  useEffect(() => {

    // if direct messaeges fetch active peer messages
    // if channel fetch channel messages
    console.log (`activePeer is ${activePeer?.username}`)
    if (chatType == PRIVATE) {
        NotifyServer (activePeer!, socket, 'checkStatus');
        EventListener (socket,'checkNotification',  (msg:any)=>{
          console.log (`${msg} from server`)
      })
      EventListener (socket,'directMessage' , (msg:any)=>{
          console.log (`${msg} from server`)
          if (msg.game)
            handleGameMessage (msg)
          else
            setDirectMessages! ([...directMessages!, msg])
  })
    }
  }, [directMessages]);
  return (
    <Stack
      borderRadius={"2xl"}
      w={"98%"}
      h="98%"
      maxH="72vh"
      maxW={'850px'}
      mx={'auto'}
      bg="#1D222C"
      justify={"space-between"}
      alignItems={"center"}
      py={2}
    >
      <HStack
        borderRadius={"2xl"}
        bg="#252932"
        justify={"space-between"}
        alignItems={"center"}
        w="98%"
        px={4}
        py={2}
      >
        <HStack spacing={4} alignItems="center">
          <Avatar
            src={
              chatType == PRIVATE
                ? activePeer?.imageUrl
                : activeChannel?.imageUrl
            }
            name={
              chatType == PRIVATE ? activePeer?.username : activeChannel?.name
            }
            size="sm"
          />
          <Text fontWeight={"bold"} fontSize={"sm"} color="#5B6171">
            {chatType == PRIVATE ? activePeer?.username : activeChannel?.name}
          </Text>
        </HStack>
        {chatType == PRIVATE && <FriendSettingsMenu user={activePeer!} />}
      </HStack>
      <MessageStack messages={directMessages} gameInvitation={GameInvitation}  setGameInvitation={setGameInvitation}/>
      <Stack w={"100%"} alignItems={"center"}>
        <ChatInputBox />
      </Stack>
    </Stack>
  );
};

export default ChatBox;
