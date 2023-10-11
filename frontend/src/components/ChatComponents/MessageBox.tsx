import { HStack, Stack, Text } from "@chakra-ui/react";
interface MessageBoxProps {
  Message: Message;
}
const MessageBox: React.FC<MessageBoxProps> = ({ Message }) => {
  return (
    <HStack justify={Message.incoming ? "end" : "start"} w="98%" mx="auto">
      <Stack
        borderRadius={"2xl"}
        bg={Message.incoming ? "#252932" : "#5B6171"}
        justify={"center"}
        alignItems={Message.incoming ? "end" : "start"}
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
          {Message.Author.username}
        </Text>
        <Text color={Message.incoming ? "#5B6171" : "#1D222C"} fontSize={"sm"}>
          {Message.content}
        </Text>
      </Stack>
    </HStack>
  );
};

export default MessageBox;
