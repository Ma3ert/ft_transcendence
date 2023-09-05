import { Avatar, HStack, Stack, Text } from "@chakra-ui/react";
interface MessageBoxProps {
  Message: Message;
}
const MessageBox: React.FC<MessageBoxProps> = ({ Message }) => {
  return (
    <HStack justify={Message.incoming ? "end" : "start"} w="98%" mx="auto">
      <Stack
        borderRadius={"2xl"}
        bg="#252932"
        justify={"center"}
        alignItems={Message.incoming ? "end" : "start"}
        w="auto"
        px={2}
        py={2}
        minW={"300px"}
        maxW="100%"
        h="auto"
      >
        <Text color="#DC585B" fontSize={"xs"}>
          {Message.Author.username}
        </Text>
        <Text color="#5B6171" fontSize={"sm"}>
          {Message.content}
        </Text>
      </Stack>
    </HStack>
  );
};

export default MessageBox;
