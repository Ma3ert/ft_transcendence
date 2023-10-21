import { HStack, Stack, Text } from "@chakra-ui/react";
import { ChatContext, UsersContext } from "@/context/Contexts";
import { useContext } from "react";
import { useAuth } from "@/hooks/useAuth";

interface MessageBoxProps {
    Message:ChannelMessage;
  }
  const ChannelMessageBox: React.FC<MessageBoxProps> = ({ Message }) => {
  
    const {Users} = useContext(UsersContext);
    const {currentUser} = useAuth ()
    const sender:(User|null) = Users!.find (user => user.id == Message.senderId) || null
    return (
      <HStack justify={"start"} w="98%" mx="auto">
        <Stack
          borderRadius={"2xl"}
          bg={"#252932"}
          justify={"center"}
          alignItems={"start"}
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
          {sender && (
            <Text color="#DC585B" fontSize={"md"} fontWeight={"bold"}>
            {(Message.senderId != currentUser!.id) ?  sender!.username :  "You"}
          </Text>
          )}
          <Text color={"#5B6171"} fontSize={"sm"}>
            {Message!.message}
          </Text>
        </Stack>
      </HStack>
    );
  };

  export default ChannelMessageBox;