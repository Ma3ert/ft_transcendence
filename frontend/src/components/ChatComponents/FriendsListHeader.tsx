import { HStack, Icon, Text, Input, Button , Tooltip} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { TbArrowBackUp } from "react-icons/tb";
import { ChannelsContext, UsersContext } from "@/context/Contexts";
import { useContext } from "react";
import { filterUsers, filterChannels } from "../../../utils/filterUsers";
import { useQueryClient } from "react-query";
import { ModalWrapper } from "../Wrappers/ModalWrapper";
import NewChannel from "../ChatComponents/NewChannel";
import { FaPlus } from "react-icons/fa";
interface FriendsListHeaderProps {
  type: "friends" | "channels";
  setUsersList?: React.Dispatch<React.SetStateAction<User[]>>;
  setChannelsList?: React.Dispatch<React.SetStateAction<Channel[]>>;
}

const FriendsListHeader: React.FC<FriendsListHeaderProps> = ({
  type,
  setUsersList,
  setChannelsList,
}) => {
  const { Users } = useContext(UsersContext);
  const { Channels } = useContext(ChannelsContext);
  const queryClient = useQueryClient ()
  return (
   <HStack
      spacing={5}
      w={"100%"}
      maxW={{ sm: "450px", md: "550px", lg: "600px", xl: "900px" }}
      minW={{ sm: "250px", md: "300px", lg: "350px", xl: "400px" }}
   >
   
    <HStack
      flex={1}
      bg="#1D222C"
      borderRadius={"15px"}
      h={"100%"}
      maxH={"50px"}
      px={1}
      py={1}
    >
      <Input
        flex={1}
        outline={"none"}
        border={"none"}
        boxShadow={"none"}
        _active={{ boxShadow: "none", outline: "none" }}
        _focus={{ boxShadow: "none", outline: "none" }}
        bg="transparent"
        color="#5B6171"
        placeholder={type === "friends" ? "Search for new friends" : "Search in your channels"}
        _placeholder={{ fontSize: "sm", color: "#5B6171" }}
        w={"100%"}
        h={"100%"}
        fontSize={"sm"}
        py={2}
        onChange={(e) => {
          if (type === "friends")
            setUsersList!(filterUsers(e.target.value, Users!));
          else setChannelsList!(filterChannels(e.target.value, Channels!));
        }}
      />
      <Button
        bg="transparent"
        color="#DC585B"
        _hover={{ transform:'scale(1.1)'}}
        _active={{ transform:'scale(1.1)'}}
        _focus={{ transform:'scale(1.1)'}}
        py={2}
        onClick={()=>{
          if (type === "friends")
            queryClient.invalidateQueries('friends')
          else queryClient.invalidateQueries('channels');
        }}
      >
        <Icon as={TbArrowBackUp} fontSize={'23px'}/>
      </Button>
    </HStack>
    {type === "channels" && <Tooltip label="Create new channel" hasArrow>
    <ModalWrapper 
    buttonValue={<Icon as={FaPlus} fontSize='18px' />}
    buttonVariant="glass"
    type="regular"
    >
      <NewChannel />
    </ModalWrapper>
      </Tooltip>}
   </HStack>
  );
};

export default FriendsListHeader;
