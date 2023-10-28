import { HStack, Stack, Text } from "@chakra-ui/react";
import { ChatContext, UsersContext } from "@/context/Contexts";
import { useContext } from "react";
import { useAuth } from "@/hooks/useAuth";
interface MessageBoxProps {
  Message: DirectMessage;
}
const MessageBox: React.FC<MessageBoxProps> = ({ Message }) => {

  const { activePeer} = useContext(UsersContext);
  const {currentUser} = useAuth ()
  return (
    <HStack justify={(Message.senderId != currentUser!.user!.id) ? "end" : "start"} w="98%" mx="auto">
      <Stack
        borderRadius={"2xl"}
        bg={(Message.senderId != currentUser!.user!.id) ? "#252932" : "#5B6171"}
        justify={"center"}
        alignItems={(Message.senderId != currentUser!.user!.id) ? "end" : "start"}
        w="auto"
        px={2}
        py={2}
        minW={"300px"}
        maxW="100%"
        h="auto"
        _hover={{
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
        }}
      >
        <Text color="#DC585B" fontSize={"md"} fontWeight={"bold"}>
          {(Message.senderId != currentUser!.user!.id) ?  activePeer?.username :  "You"}
        </Text>
        <Text color={(Message.senderId != currentUser!.user!.id) ? "#5B6171" : "#1D222C"} fontSize={"sm"}>
          {Message!.message}
        </Text>
      </Stack>
    </HStack>
  );
};

export default MessageBox;
