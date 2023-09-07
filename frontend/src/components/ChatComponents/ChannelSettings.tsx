import { HStack, Stack, Text, Button, Switch, Icon } from "@chakra-ui/react";
import { SlArrowRight } from "react-icons/sl";
interface ChannelSettingsProps {}

const ChannelSettings: React.FC<ChannelSettingsProps> = ({}) => {
  return (
    <Stack justify="center" align="space-between" w="100%" maxW={'300px'} h="100%" spacing={4}>
      <Stack
        w={"95%"}
        bg="#1D222C"
        borderRadius={"2xl"}
        p={4}
        alignItems={"start"}
        justify="start"
        flex={1}
        spacing={4}
      >
        <HStack px={4} w={"90%"} justify={"space-between"}>
          <Text color={"#5B6171"} fontSize={'md'}>Private channel</Text>
          <Switch size={"lg"} colorScheme="red" />
        </HStack>
        <Button
          _hover={{ bg: "#252932" }}
          color={"#5B6171"}
          colorScheme="ghost"
          w="90%"
        >
          <HStack justify={"space-between"} w={"100%"}>
            <Text color={"#5B6171"}>Set Password</Text>
            <Icon as={SlArrowRight} />
          </HStack>
        </Button>
        <Button
          _hover={{ bg: "#252932" }}
          color={"#5B6171"}
          colorScheme="ghost"
          w="90%"
        >
          <HStack justify={"space-between"} w={"100%"}>
            <Text color={"#5B6171"}>Members</Text>
            <Icon as={SlArrowRight} />
          </HStack>
        </Button>
      </Stack>
      <Button
        mx={"auto"}
        borderRadius={"2xl"}
        _hover={{ opacity: 0.8 }}
        bg="#DC585B"
        color={"white"}
        px={8}
        py={4}
        maxW={"250px"}
      >
        <Text>Leave Channel</Text>
      </Button>
    </Stack>
  );
};

export default ChannelSettings;
