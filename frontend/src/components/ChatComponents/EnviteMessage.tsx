import { HStack, Stack, Text, Image, Button } from "@chakra-ui/react";
interface EnviteMessageProps {
  Message: Message;
}
const EnviteMessage: React.FC<EnviteMessageProps> = ({ Message }) => {
  return (
    <HStack
      justify={Message.incoming ? "end" : "start"}
      w="98%"
      mx="auto"
      spacing={3}
    >
      <HStack
        borderRadius={"2xl"}
        bg={Message.incoming ? "#252932" : "#5B6171"}
        minW={"300px"}
        maxW="100%"
        px={2}
        py={2}
        w="auto"
        h="auto"
        spacing={5}
      >
        <Image src={Message.incoming ?  "/LightSolidLogo.png" : "/DarkSolidLogo.png" } alt={"envite"} w={8} h={"auto"} />
        <Stack justify={"center"} alignItems={"center"} p={2}>
          <Text
            color={Message.incoming ? "#5B6171" : "#1D222C"}
            fontSize={"sm"}
            fontWeight={"bold"}
          >
            {Message.Author.username} Looking for a 1v1 ..
          </Text>
          <Button variant={Message.incoming ? 'lightGray' : 'darkGray'} >
            {`let's go`}
          </Button>
        </Stack>
      </HStack>
    </HStack>
  );
};
export default EnviteMessage;
