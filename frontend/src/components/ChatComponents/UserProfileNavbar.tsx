import { UsersContext , ChatContext} from "@/context/Contexts";
import { HStack, Icon, Button, Image } from "@chakra-ui/react"
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FaMessage } from "react-icons/fa6";
import { PRIVATE } from "../../../contstants";
import OptionsMenu from "./FriendSettingsMenu";

interface UserProfileNavbarProps {
    user: User;
}
const UserProfileNavbar:React.FC<UserProfileNavbarProps> = ({user}) => {

    const router = useRouter ()
    const {setActivePeer} = useContext (UsersContext)
    const {setCurrentChat} = useContext (ChatContext)
    return (
        <HStack spacing={4}>
            <Icon
            onClick={() => {
              setActivePeer!(user);
              setCurrentChat!(PRIVATE);
              router.push("/Chat");
            }}
            color='#5B6171'
            _hover={{transform: 'scale(1.1)', color:'#DC585B'}}
            as={FaMessage}
            fontSize="22px"
          />
         
        </HStack>
    )
}

export default UserProfileNavbar