import React, { useContext , useEffect} from "react";
import { ChatContext } from "@/context/Contexts";
import { HStack, Stack, Text, Image, Button } from "@chakra-ui/react";
import {loggedIndUser} from "../../../contstants";
interface EnviteMessageProps {
  gameInvitation: GameInvitation | null;
  setGameInvitation: React.Dispatch<GameInvitation | null>;
}
const EnviteMessage: React.FC<EnviteMessageProps> = ({ gameInvitation, setGameInvitation }) => {

  const { activePeer , joinGameStatus, setJoinGameStatus} = useContext(ChatContext);


   useEffect(() => {
    // Create a setTimeout to change the message after 3 seconds
    const timerId = setTimeout(() => {
      setJoinGameStatus! (false);
      setGameInvitation(null);
    }, 15000); // 3000 milliseconds (3 seconds)

    // Clean up the timer when the component unmounts or when needed
    return () => clearTimeout(timerId);
  }, []);
  return (
    <HStack
      justify={(gameInvitation!.from != loggedIndUser.id)? "end" : "start"}
      w="98%"
      mx="auto"
      spacing={3}
    >
      <HStack
        borderRadius={"2xl"}
        bg={(gameInvitation!.from != loggedIndUser.id) ? "#252932" : "#5B6171"}
        minW={"300px"}
        maxW="100%"
        px={2}
        py={2}
        w="auto"
        h="auto"
        spacing={5}
      >
        <Image src={(gameInvitation!.from != loggedIndUser.id) ?  "/LightSolidLogo.png" : "/DarkSolidLogo.png" } alt={"envite"} w={8} h={"auto"} />
        <Stack justify={"center"} alignItems={"center"} p={2}>
          <Text
            color={(gameInvitation!.from != loggedIndUser.id) ? "#5B6171" : "#1D222C"}
            fontSize={"sm"}
            fontWeight={"bold"}
          >
            {(gameInvitation!.from != loggedIndUser.id) ? activePeer!.username :'you'} Looking for a 1v1 ..
          </Text>
          <Button onClick={()=>{
            setJoinGameStatus! (false)
            setGameInvitation (null)
          }} variant={(gameInvitation!.from != loggedIndUser.id) ? 'lightGray' : 'darkGray'} >
            {`let's go`}
          </Button>
        </Stack>
      </HStack>
    </HStack>
  );
};
export default EnviteMessage;
