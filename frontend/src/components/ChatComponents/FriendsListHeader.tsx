import { HStack, Icon, Text, Input, Button, Tooltip } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import { TbArrowBackUp } from "react-icons/tb";
import { ChannelsContext, UserChannelsContext, UsersContext } from "@/context/Contexts";
import { useContext, useState } from "react";
import { filterUsers, filterChannels } from "../../../utils/filterUsers";
import { useQueryClient } from "@tanstack/react-query";
import { ModalWrapper } from "../Wrappers/ModalWrapper";
import NewChannel from "../ChatComponents/NewChannel";
import { FaPlus } from "react-icons/fa";
import useChannels from "@/hooks/useChannels";
interface FriendsListHeaderProps {
  type: "friends" | "channels";
  Channels?:Channel []
  publicChannels?:Channel []
  setUsersList?: React.Dispatch<React.SetStateAction<User[]>>;
  setChannelsList?: React.Dispatch<React.SetStateAction<Channel[]>>;
  setPublicChannels?: React.Dispatch<React.SetStateAction<Channel[]>>;
}

const FriendsListHeader: React.FC<FriendsListHeaderProps> = ({
  type,

  setUsersList,
  setChannelsList,
  setPublicChannels,
}) => {
  const [input, setInput] = useState<string>("");
  const {Channels, PublicChannels} = useContext (UserChannelsContext)
  const { Users } = useContext(UsersContext);
  const { friendsList } = useContext(UsersContext);
  const queryClient = useQueryClient();
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
          value={input}
          outline={"none"}
          border={"none"}
          boxShadow={"none"}
          _active={{ boxShadow: "none", outline: "none" }}
          _focus={{ boxShadow: "none", outline: "none" }}
          bg="transparent"
          color="#5B6171"
          placeholder={
            type === "friends"
              ? "Search for new friends"
              : "Search in your channels"
          }
          _placeholder={{ fontSize: "sm", color: "#5B6171" }}
          w={"100%"}
          h={"100%"}
          fontSize={"sm"}
          py={2}
          onChange={(e) => {
            setInput(e.target.value);
            if (type === "friends") {
              setUsersList!(filterUsers(input, Users!));
            } else {
              setChannelsList!(filterChannels(input, Channels!));
              setPublicChannels!(filterChannels(input, PublicChannels!));
            }
          }}
        />
        <Button
          bg="transparent"
          color="#DC585B"
          _hover={{ transform: "scale(1.1)" }}
          _active={{ transform: "scale(1.1)" }}
          _focus={{ transform: "scale(1.1)" }}
          py={2}
          onClick={() => {
            if (type === "friends") {
              setUsersList!(friendsList!);
              setInput("");
            } else {
              setChannelsList!(Channels!);
              setPublicChannels!(PublicChannels!);
              setInput("")
            }
          }}
        >
          <Icon as={TbArrowBackUp} fontSize={"23px"} />
        </Button>
      </HStack>
      {type === "channels" && (
        <Tooltip label="Create new channel" hasArrow>
          <ModalWrapper
            buttonValue={<Icon as={FaPlus} fontSize="18px" />}
            buttonVariant="glass"
            type="regular"
          >
            <NewChannel />
          </ModalWrapper>
        </Tooltip>
      )}
    </HStack>
  );
};

export default FriendsListHeader;
