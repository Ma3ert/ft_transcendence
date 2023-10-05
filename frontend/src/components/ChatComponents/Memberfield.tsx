
import React, {useContext, useState, useEffect} from 'react';
import { useQuery } from 'react-query';
import apiClient from '@/services/requestProcessor';
import UserField from '../UserField';
import { UsersContext } from '@/context/Contexts';
import { Text } from '@chakra-ui/react';
import { getUserRole } from '../../../utils/helpers';

interface MemberFieldProps {
    member: Member
    members: Member[]
}
const MemberField:React.FC<MemberFieldProps> = ({member, members}) => {

    const [user, setUser] = useState<User | null>(null);
    const {Users, loggedInUser} = useContext(UsersContext)
    useEffect(() => {

        const user = Users!.find((user) => user.id === member.userId);
        if(user) {
            setUser(user);
        }
    }, [Users, user])
    return (user ? <UserField user={user!} loggedInUserRole={getUserRole (loggedInUser!, members)} userRole={getUserRole (user, members)} /> : <Text>user is not found</Text>);
}

export default MemberField;
