
import React, {useContext, useState, useEffect} from 'react';
import { useQuery } from 'react-query';
import apiClient from '@/services/requestProcessor';
import UserField from '../UserField';
import { UsersContext } from '@/context/Contexts';
import { Text } from '@chakra-ui/react';
import { getUserRole } from '../../../utils/helpers';
import { useAuth } from '@/hooks/useAuth';

interface MemberFieldProps {
    member: Member
    members: Member[]
}
const MemberField:React.FC<MemberFieldProps> = ({member, members}) => {

    const [user, setUser] = useState<User | null>(null);
    const {Users} = useContext(UsersContext)
    const {currentUser} = useAuth ()
    useEffect(() => {

        const user = Users!.find((user) => user.id === member.user);
        if(user) {
            setUser(user);
        }
    }, [Users, user])
    return (user ? <UserField  member={member!} user={user!} loggedInUserRole={getUserRole (currentUser!, members)} userRole={getUserRole (user, members)} /> : <Text>user is not found</Text>);
}

export default MemberField;
