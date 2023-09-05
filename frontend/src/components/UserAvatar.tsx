import { Avatar } from "@chakra-ui/react"
import { AvatarBadge } from "@chakra-ui/react"
interface UserAvatarProps {
    url: string;
    status?:boolean
    name:string
}

const UserAvatar:React.FC<UserAvatarProps> = ({url, status, name}) => {
    return (
        <Avatar name={name} src={url} border={'2px'} borderColor={'green.400'}>
            {status && <AvatarBadge boxSize='1.25em' bg='green.500' />
}
        </Avatar>    )
}

export default UserAvatar