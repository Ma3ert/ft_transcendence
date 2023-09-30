import { HStack, Stack, Grid, GridItem } from "@chakra-ui/react";
import FriendsListHeader from "../ChatComponents/FriendsListHeader";
import ScrollableStack from "../ScrollableStack";
import UserField from "../UserField";
import { friendsList } from "../../../contstants";
import { useState , useEffect, useContext} from "react";
import { UsersContext } from "@/context/Contexts";

interface FriendsListProps {}
const FriendsListSection: React.FC<FriendsListProps> = ({}) => {

    const [friendsListType, setFriendsListType] = useState<'friends' | 'search'>('friends')
    const [usersList, setUsersList] = useState<User[]>([])
    const {friendsList} = useContext(UsersContext)

    useEffect (() => {
        // fetch friends list
        if (friendsListType === 'friends') {
            setUsersList(friendsList!)
        } else {
            setUsersList([])
        }

    }, [friendsListType])
  return (
    <Stack w={"60%"} h="100%" spacing={5} justifyContent={'center'} alignItems={'center'}>
      <FriendsListHeader friendsListType={friendsListType} setFriendsListType={setFriendsListType} setUsersList={setUsersList} />
      <ScrollableStack>
        {usersList.map((friend, index) => (
            <UserField key={index} user={friend} />
        ))}
      </ScrollableStack>
    </Stack>
  );
};

export default FriendsListSection;
