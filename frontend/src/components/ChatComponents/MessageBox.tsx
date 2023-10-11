import { HStack, Stack, Text } from "@chakra-ui/react";
import { ChatContext, UsersContext } from "@/context/Contexts";
import { useContext } from "react";
interface MessageBoxProps {
  Message: DirectMessage;
}
const MessageBox: React.FC<MessageBoxProps> = ({ Message }) => {

  const { activePeer, loggedInUser } = useContext(UsersContext);
  return (
    <HStack justify={(Message.from != loggedInUser!.id) ? "end" : "start"} w="98%" mx="auto">
      <Stack
        borderRadius={"2xl"}
        bg={(Message.from != loggedInUser!.id) ? "#252932" : "#5B6171"}
        justify={"center"}
        alignItems={(Message.from != loggedInUser!.id) ? "end" : "start"}
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
        <Text color="#DC585B" fontSize={"xs"} fontWeight={"bold"}>
          {(Message.from != loggedInUser!.id) ?  activePeer?.username :  "You"}
        </Text>
        <Text color={(Message.from != loggedInUser!.id) ? "#5B6171" : "#1D222C"} fontSize={"sm"}>
          {Message!.message}
        </Text>
      </Stack>
    </HStack>
  );
};

export default MessageBox;
