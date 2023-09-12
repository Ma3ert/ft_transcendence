import { Avatar, Stack, HStack, Text } from "@chakra-ui/react";
import UserAvatar from "../UserAvatar";
import FilterBox from "./FilterBox";
interface FriendsListProps {
  friends: User[];
}
const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  return (
    <Stack w='auto' borderRadius={"2xl"} p={4} bg={"#1D222C"} spacing={2}>
      {friends.map((friend, index) => {
        return (
          <HStack spacing={4} key={index} alignItems={'center'} borderRadius={'2xl'} w='98%' _hover={{bg:'#252932'}}>
             <UserAvatar
              url={friend.imageUrl}
              name={friend.username}
              status={friend.online}
            />

          </HStack>
        );
      })}
    </Stack>
  );
};

export default FriendsList;
