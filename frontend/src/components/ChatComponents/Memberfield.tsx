
import React, {useContext, useState, useEffect} from 'react';
import UserField from '../UserField';
import { UsersContext } from '@/context/Contexts';
import { Text } from '@chakra-ui/react';

interface MemberFieldProps {
    member: Member
    members: Member[]
}
const MemberField:React.FC<MemberFieldProps> = ({member, members}) => {

    const [user, setUser] = useState<User | null>(null);
    const {Users} = useContext(UsersContext)
    useEffect(() => {
        const user = Users!.find((user) => user.id === member.user);
        if(user) {
            setUser(user);
        }
    }, [Users, user])
    return (user ? <UserField  member={member!} user={user!}  MembersList={members} /> : <Text>user is not found</Text>);
}

export default MemberField;
