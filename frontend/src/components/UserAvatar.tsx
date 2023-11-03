import { Avatar, AvatarBadge, Box, Icon } from "@chakra-ui/react";
import NotificationBadge from "./ChatComponents/NotificationBadge";
import { HiMiniUserGroup } from "react-icons/hi2";
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
 
  const avatar:string = isChannel ? `http://e1r8p2.1337.ma:3000/${channel!.avatar}` 
  :  (user?.avatar.includes("http") ? user!.avatar : "http://e1r8p2.1337.ma:3000/public/users/imgs/" + user!.avatar);
  return (
    <Avatar
      transform={active ? "scale(1.1)" : "scale(1)"}
      borderRadius={isChannel ? "15px" : "full"}
      onClick={action}
      size={size}
      src={avatar}
      _hover={{
        opacity: 0.8,
        transition: "all 0.2s ease-in-out",
      }}
      bg="#252932"
      icon={<Icon fontSize="25px" color="#5B6171" as={HiMiniUserGroup} />}
    ></Avatar>
  );
};

export default UserAvatar;
