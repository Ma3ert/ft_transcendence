'use client';
import { HStack, Text, transition } from '@chakra-ui/react'
import React from 'react'
import Logo from '../Logo'
import Link from 'next/link'
import { Icon } from '@chakra-ui/react'
import { FaSignOutAlt } from 'react-icons/fa'
import UserStatus from '../../components/UserStatus'
import UserAvatar from '../../components/UserAvatar'
import IconButton  from '../../components/IconButton'
import { friendsList } from '../../../contstants'
import { useContext } from 'react'
import { GlobalContext, UsersContext } from '@/context/Contexts'
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Header() {

  // const {loggedInUser} = useContext (UsersContext)
  const router = useRouter();
  const {currentUser, updateUser} = useAuth()
  if (!currentUser)
  router.push("/");

  const handleLogout = () => {
    router.push("http://localhost:3000/auth/42/logout");
    // Cookies.remove('jwt');
  }

  return (
    <header>
        <HStack justify={'space-between'} p={4} mx={'auto'} w={{sm:'98%', lg:'95%', xl:'90%', vl:'86%'}}>
        <Logo src="/logo.png" width="120px" height="auto"/>

        <HStack justify='center' alignItems='center' spacing={12} maxW={'6xl'}>
            <UserStatus username={currentUser!.username} status={true}/>
            <UserAvatar  user={currentUser!}/>
            <IconButton
              icon={FaSignOutAlt}
              size="40px"
              aria-label="Sign out"
              onClick={handleLogout}
            />
        </HStack>
        </HStack>
    </header>
  )
}