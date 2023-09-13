import { HStack, Stack, Text, Button, Switch, Icon , Image} from "@chakra-ui/react";
import { SlArrowRight } from "react-icons/sl";
interface ChannelSettingsProps {}

const ChannelSettings: React.FC<ChannelSettingsProps> = ({}) => {
  return (
    <Stack spacing={5} justifyContent={'space-around'} alignItems={'center'}   h="100%" w="100%"  >
      <Stack spacing={3} w="100%"  justify={'center'} alignItems={'center'}>
        <Image src='/settings.png' alt='settings' w={8} h={'auto'} _hover={{opacity:0.8, transform:'scale(1.1)'}} />
      <Stack
        w="100%"
        bg="#1D222C"
        borderRadius={"2xl"}
        p={4}
        alignItems={"start"}
        justify="start"
        spacing={4}
        h='auto'
        minW={'auto'}
        minH={'250px'}
        maxH='500px'
        maxW='300px'
      >
        <HStack px={4} w={"99%"} justify={"space-between"}>
          <Text color={"#5B6171"} fontSize='sm'> Private </Text>
          <Switch size={"lg"} colorScheme="red" />
        </HStack>
        <Button
          _hover={{ bg: "#252932" }}
          color={"#5B6171"}
          colorScheme="ghost"
          w="99%"
          fontSize={'xs'}
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
          w="99%"
          fontSize={'xs'}
        >
          <HStack justify={"space-between"} w={"100%"}>
            <Text fontSize={'sm'} color={"#5B6171"}>Members</Text>
            <Icon as={SlArrowRight} />
          </HStack>
        </Button>
      </Stack>
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
        w={"98%"}
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
