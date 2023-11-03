import {
  FormControl,
  Stack,
  Input,
  HStack,
  Button,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import MemberField from "./Memberfield";
import ScrollableStack from "../ScrollableStack";
import { MembersContext, UsersContext } from "@/context/Contexts";
import useMembers from "@/hooks/useMembers";
interface MembersListProps {
  members:Member[]
}
const MembersList: React.FC<MembersListProps> = ({ members }) => {
  const { Users } = useContext(UsersContext);
  const [usersList, setUsersList] = useState <User[]> ([]);



  useEffect (()=>{
    
    // const userList = Users?.filter((user) => {
    //   return members!.findIndex((member) => member.user == user.id) != -1;
    // });
    // setUsersList (userList!);
  }, [members])

  return (
    <Stack
      spacing={4}
      w="100%"
      h="100%"
      maxH="100%"
      justifyContent={"center"}
      alignItems={"center"}
    >
      {members!.length ? (
        <>
          {" "}
          <ScrollableStack h="50vh">
            {members!.map((member, index) => {
              const user = Users!.find (user => user.id === member.user);
              return (
                <MemberField
                  user={user!}
                  member={member}
                  key={index}
                  members={members!}
                />
              );
            })}
          </ScrollableStack>
        </>
      ) : (
        <Text fontFamily="visbyRound" color="#5B6171" fontSize="sm">
          this channel has no members
        </Text>
      )}
    </Stack>
  );
};

export default MembersList;
