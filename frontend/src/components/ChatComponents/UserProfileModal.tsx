import { HStack, Heading, Stack, Text, Button, Image } from "@chakra-ui/react";
import UserAvatar from "../UserAvatar";
import IconButton from "../IconButton";
import { FaEllipsis } from "react-icons/fa6";

interface UserProfileModalProps {
  user: User;
}
const UserProfileModal: React.FC<UserProfileModalProps> = ({ user }) => {
  return (
    <Stack
      spacing={8}
      w="100%"
      h="100%"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <UserAvatar user={user} size='xl'/>
      <HStack spacing={2}>
        <Heading fontSize={"3xl"} color={"#5B6171"}>
          LEVEL
        </Heading>
        <Heading fontSize={"3xl"} color={"#D9D9D9"}>
          {user.level}
        </Heading>
      </HStack>
      <Text color="#5B6171" fontSize="md">
        {user.username}
      </Text>

      <HStack spacing={4}>
        <Button
          bg="transparent"
          border="none"
          outline={"none"}
          _hover={{ opacity: 0.8 }}
          _active={{ transform: "scale(1.1)" }}
        >
          <Image src={"/LightSolidLogo.png"} alt={"envite"} w={6} h={"auto"} />
        </Button>
        <Button
          bg="transparent"
          border="none"
          outline={"none"}
          _hover={{ opacity: 0.8 }}
          _active={{ transform: "scale(1.1)" }}
        >
          <Image src={"/addFriend.png"} alt={"envite"} w={6} h={"auto"} />
        </Button>

        <IconButton icon={FaEllipsis} color="#5B6171" size="25px" />

      </HStack>
    </Stack>
  );
};


export default UserProfileModal;