import { Avatar } from "@chakra-ui/react"
import { AvatarBadge } from "@chakra-ui/react"
interface UserAvatarProps {
    user?: User;
    channel?: Channel;
    isChannel?: boolean;
}

const UserAvatar:React.FC<UserAvatarProps> = ({isChannel, channel, user}) => {
    return (
        <Avatar name={isChannel ? channel?.name : user?.username} src={isChannel ? channel?.imageUrl : user?.imageUrl} _hover={{
            transform: 'scale(1.1)',
            transition: 'all 0.2s ease-in-out',
            boxShadow: '0 0 0 2px #DC585B'
        }}>
            {isChannel && user?.online && <AvatarBadge boxSize='0.89em' border='none' bg='#DC585B' />
}
        </Avatar>    )
}

export default UserAvatar