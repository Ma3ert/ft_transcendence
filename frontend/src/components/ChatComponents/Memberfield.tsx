
import React, {useContext, useState, useEffect} from 'react';
import UserField from '../UserField';
import { UsersContext } from '@/context/Contexts';
import { Button, HStack, Stack, Text } from '@chakra-ui/react';
import UserAvatar from '../UserAvatar';
import UserFieldNav from './UserFieldNav';
import { useAuth } from '@/hooks/useAuth';
import OptionsMenu from './FriendSettingsMenu';

interface MemberFieldProps {
    member: Member
    user:User
    members: Member[]
}
const MemberField:React.FC<MemberFieldProps> = ({member, members, user}) => {

    const {Users} = useContext(UsersContext)

    const {currentUser} = useAuth ()
    useEffect(() => {
       
    }, [Users, user])
    return (<Button variant={'field'} w={'100%'} h='auto'>
        <HStack w='100%' h='100%' justify='space-between' alignItems='center'>
            <HStack spacing={5} w='100%' justify='start' alignItems='center' px={3} py={2}>
              <UserAvatar user={user!} />
              <Stack spacing={4} w='100%' h='100%' justify='start' alignItems='start'>
                <Text color='#D9D9D9' fontSize='sm'>{user!.username}</Text>
                <Text color='#5B6171' fontSize='xs'>{member.role.toLowerCase ()}</Text>
              </Stack>
            </HStack>
            
            <UserFieldNav
              member={member!}
              user={user!}
            />

          {user!.id != currentUser.user!.id && (
            <OptionsMenu
              member={member!}
              user={user!}
              MembersList={members!}
            />
          )}
        </HStack>
            
    </Button>);
}

export default MemberField;
