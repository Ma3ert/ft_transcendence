import { HStack, Stack, Text } from "@chakra-ui/react";
import { ChatContext, UsersContext } from "@/context/Contexts";
import { useContext } from "react";

interface MessageBoxProps {
    Message: DirectMessage;
  }
  const ChannelMessageBox: React.FC<MessageBoxProps> = ({ Message }) => {
  
    const {loggedInUser , Users} = useContext(UsersContext);
    const sender:(User|null) = Users!.find (user => user.id == Message.userId) || null
    return (
      <HStack justify={"start"} w="98%" mx="auto">
        <Stack
          borderRadius={"2xl"}
          bg={"#5B6171"}
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
            <Text color="#DC585B" fontSize={"xs"} fontWeight={"bold"}>
            {(Message.userId != loggedInUser!.id) ?  sender!.username :  "You"}
          </Text>
          )}
          <Text color={"#1D222C"} fontSize={"sm"}>
            {Message!.content}
          </Text>
        </Stack>
      </HStack>
    );
  };

  export default ChannelMessageBox;