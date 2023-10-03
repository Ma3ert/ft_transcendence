
import React, {useContext, useState, useEffect} from 'react';
import { useQuery } from 'react-query';
import apiClient from '@/services/requestProcessor';
import UserField from '../UserField';
import { UsersContext } from '@/context/Contexts';
import { Text } from '@chakra-ui/react';

interface MemberFieldProps {
    member: Member
}
const MemberField:React.FC<MemberFieldProps> = ({member}) => {

    const [user, setUser] = useState<User | null>(null);
    const {Users} = useContext(UsersContext)
    useEffect(() => {

        const user = Users!.find((user) => user.id === member.userId);
        if(user) {
            setUser(user);
        }
    }, [Users, user])
    return (user ? <UserField user={user!} userType={member.role  == 'OWNER' ? 'Owner' : 'Friend'} /> : <Text>user is not found</Text>);
}

export default MemberField;
