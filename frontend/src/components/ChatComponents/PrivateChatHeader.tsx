import { HStack, Text, Avatar } from "@chakra-ui/react";
import UserAvatar from "../UserAvatar";
import { FaEllipsis } from "react-icons/fa6";
import IconButton from "../IconButton";
interface PrivateChatHeaderProps {
  Peer: User;
}

const PrivateChatHeader: React.FC<PrivateChatHeaderProps> = ({ Peer }) => {
  return (
    <HStack
      borderRadius={"2xl"}
      bg="#252932"
      justify={"space-between"}
      alignItems={"center"}
      w="98%"
      p={4}
    >
      <HStack spacing={4} alignItems="center">
        <Avatar src={Peer.imageUrl} name={Peer.username} size="sm" />
        <Text fontFamily="visbyRound" fontWeight={"bold"} color="#5B6171">
          {Peer.username}
        </Text>
      </HStack>
      <IconButton icon={FaEllipsis} size="25px" />
    </HStack>
  );
};

export default PrivateChatHeader;
