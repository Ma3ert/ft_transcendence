import { Text, Icon , HStack} from "@chakra-ui/react";
import { FaMessage } from "react-icons/fa6";
import React, { useContext } from "react";
import { AppNavigationContext, ChatContext, UsersContext } from "@/context/Contexts";
import { PRIVATE } from "../../../contstants";
import {BsFillMicMuteFill} from "react-icons/bs";
import { useRouter } from "next/navigation";
interface UserFieldNavProps {
  member?:Member
  user: User;
}


const checkIfMember = (userType: UserType) => {
  if (
    (userType === "MEMBER") ||
    (userType === "ADMIN") ||
    (userType === "OWNER")
  ) {
    return true;
  }
  return false;
};
const GetMemberStatus = (member:Member) => {

  if (member!.banned) return <Text fontSize="sm"  color='#DC585B'>Banned</Text>
  if (member!.muted) return <Icon as={BsFillMicMuteFill} fontSize="22px" color='#DC585B' _hover={{ transform: "scale(1.1)" }}/>
}

const UserFieldNav:React.FC<UserFieldNavProps> = ({user, member}) => {
  
    const {setActivePeer, friendsList} = useContext(UsersContext)
    const {setCurrentChat} = useContext(ChatContext)
    const router = useRouter ()    

    return (
    <HStack spacing={3}>
      {member && GetMemberStatus(member!)}
      {friendsList!.find((friend) => friend.id == user.id) && (
          <Icon
            onClick={() => {
              setActivePeer!(user);
              setCurrentChat!(PRIVATE);
              router.push("/Chat");
            }}
            as={FaMessage}
            fontSize="22px"
            _hover={{ transform: "scale(1.1)" }}
          />
        )}
    </HStack>
  );
};


export default UserFieldNav;