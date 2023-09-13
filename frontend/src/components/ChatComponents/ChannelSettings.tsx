import { HStack, Stack, Text, Button, Switch, Icon } from "@chakra-ui/react";
import { SlArrowRight } from "react-icons/sl";
interface ChannelSettingsProps {}

const ChannelSettings: React.FC<ChannelSettingsProps> = ({}) => {
  return (
    <Stack justify="space-between" alignItems={'center'}   h="100%"   >
      <Stack
        w={"auto"}
        bg="#1D222C"
        borderRadius={"2xl"}
        p={4}
        alignItems={"start"}
        justify="start"
        spacing={4}
        h='auto'
        minW={'300px'}
        minH={'50%'}
        maxH='500px'

      >
        <HStack px={4} w={"90%"} justify={"space-between"}>
          <Text color={"#5B6171"} fontSize='sm'> Private channel</Text>
          <Switch size={"lg"} colorScheme="red" />
        </HStack>
        <Button
          _hover={{ bg: "#252932" }}
          color={"#5B6171"}
          colorScheme="ghost"
          w="90%"
        >
          <HStack justify={"space-between"} w={"100%"}>
            <Text fontSize={'sm'} color={"#5B6171"}>Set Password</Text>
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
            <Text fontSize={'sm'} color={"#5B6171"}>Members</Text>
            <Icon as={SlArrowRight} />
          </HStack>
        </Button>
      </Stack>
    <Stack spacing={3}>
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
      <Button
        colorScheme="darkGhost"
        color={"#5B6171"}
        borderRadius={"2xl"}
        _hover={{ opacity: 0.8 }}
        >
          Envite
        </Button>
    </Stack>
    </Stack>
  );
};

export default ChannelSettings;
