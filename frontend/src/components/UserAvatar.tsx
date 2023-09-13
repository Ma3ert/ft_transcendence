import { Avatar } from "@chakra-ui/react"
import { AvatarBadge } from "@chakra-ui/react"
interface UserAvatarProps {
    url: string;
    status?:boolean
    name:string
}

const UserAvatar:React.FC<UserAvatarProps> = ({url, status, name}) => {
    return (
        <Avatar name={name} src={url} _hover={{
            transform: 'scale(1.1)',
            transition: 'all 0.2s ease-in-out',
            border: '2px solid #DC585B',
        }}>
            {status && <AvatarBadge boxSize='0.89em' border='none' bg='#DC585B' />
}
        </Avatar>    )
}

export default UserAvatar