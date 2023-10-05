import { Text, Icon } from "@chakra-ui/react";
import { FaMessage } from "react-icons/fa6";
import React, { useContext } from "react";
import { AppNavigationContext, ChatContext, UsersContext } from "@/context/Contexts";
import { PRIVATE } from "../../../contstants";
interface UserFieldNavProps {
  user: User;
  userRole: string;
  friendsList: User[];
}
const UserFieldNav:React.FC<UserFieldNavProps> = ({userRole, user, friendsList}) => {
  
    const {setActivePeer} = useContext(UsersContext)
    const {setCurrentSection} = useContext(AppNavigationContext)
    const {setCurrentChat} = useContext(ChatContext)
    
    const checkIfMember = (userType: UserType) => {
        if (
          (userType === "MEMBER") ||
          (userType === "ADMIN") ||
          (userType === "OWNER")
        ) {
          return true;
        }
        false;
      };
    return (
    <>
      {checkIfMember(userRole) && <Text fontSize="sm">{userRole}</Text>}
      {friendsList!.length &&
        friendsList!.find((friend) => friend.id == user.id) && (
          <Icon
            onClick={() => {
              setActivePeer!(user);
              setCurrentSection!("chat");
              setCurrentChat!(PRIVATE);
            }}
            as={FaMessage}
            fontSize="22px"
            _hover={{ transform: "scale(1.1)" }}
          />
        )}
    </>
  );
};


export default UserFieldNav;