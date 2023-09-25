import { Avatar, AvatarBadge, Box } from "@chakra-ui/react";
import NotificationBadge from "./ChatComponents/NotificationBadge";
interface UserAvatarProps {
  user?: User;
  channel?: Channel;
  isChannel?: boolean;
  size?: string;
  active?: boolean;
  action?: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  isChannel,
  channel,
  user,
  size,
  action,
  active,
}) => {
  return (
    <Avatar
      transform={active ? "scale(1.1)" : "scale(1)"}
      borderRadius={isChannel ? "15px" : "full"}
      onClick={action}
      size={size}
      name={isChannel ? channel?.name : user?.username}
      src={isChannel ? channel?.imageUrl : user?.imageUrl}
      _hover={{
        opacity: 0.8,
        transition: "all 0.2s ease-in-out",
      }}
    ></Avatar>
  );
};

export default UserAvatar;
