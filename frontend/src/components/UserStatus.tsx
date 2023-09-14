import { HStack, Text } from '@chakra-ui/react'
interface UserStatusProps {
    username: string;
    status:boolean
}
const UserStatus:React.FC<UserStatusProps> = ({username, status}) => {
    return (
        <HStack spacing={2}>
            <Text color='#5B6171' fontWeight={'bold'} fontSize={'sm'}>{username}</Text>
        </HStack>
    )
}

export default UserStatus