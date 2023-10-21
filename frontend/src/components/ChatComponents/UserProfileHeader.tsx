import { HStack, Heading, Stack, Text } from "@chakra-ui/react";
import UserAvatar from "../UserAvatar";
import UserProfileNavbar from "./UserProfileNavbar";

interface UserProfileHeaderProps {
  user: User;
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({ user }) => {
  return (
    <HStack justifyContent={'space-between'} alignItems={'center'} w="100%">
        <HStack spacing={4}>
      <UserAvatar user={user} size="md" />
      <Stack spacing={2}>
        <Heading color="#5B6171" fontSize="md">
          {user.username}
        </Heading>
        <HStack spacing={2}>
          <Heading fontSize={"md"} color={"#5B6171"}>
            LEVEL
          </Heading>
          <Heading fontSize={"l"} fontWeight={"bold"} color={"#D9D9D9"}>
            12
          </Heading>
        </HStack>
      </Stack>
    </HStack>
    <UserProfileNavbar user={user}/>
    </HStack>
  );
};

export default UserProfileHeader;
