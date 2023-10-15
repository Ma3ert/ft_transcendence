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

export default function Header() {

  const {loggedInUser} = useContext (UsersContext)

  return (
    <header>
        <HStack justify={'space-between'} p={4} mx={'auto'} w={{sm:'98%', lg:'95%', xl:'90%', vl:'86%'}}>
        <Logo src="/logo.png" width="120px" height="auto"/>

        <HStack justify='center' alignItems='center' spacing={12} maxW={'6xl'}>
<<<<<<< HEAD
            <UserStatus username='yassiiiiir12' status={true}/>
<<<<<<< HEAD
            <UserAvatar url='https://avatars.githubusercontent.com/u/55942632?v=4' status={true}/>
             <IconButton size={'25px'} icon={FaSignOutAlt} aria-label="Sign out" />
=======
            <UserAvatar  user={friendsList[0]}/>
=======
            <UserStatus username={loggedInUser!.username} status={true}/>
            <UserAvatar  user={loggedInUser!}/>
>>>>>>> 4ea7f3557f8920e0f6c6ba470d43e5cf07ddc355
             <IconButton color='#5B6171' size={'25px'} icon={FaSignOutAlt} aria-label="Sign out" />
>>>>>>> 15f18bb3fe249568ef62572417b48a8a0f221704
        </HStack>
        </HStack>
    </header>
  )
}
