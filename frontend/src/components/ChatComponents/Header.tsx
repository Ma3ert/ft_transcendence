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
            <UserStatus username={loggedInUser!.username} status={true}/>
            <UserAvatar  user={loggedInUser!}/>
             <IconButton color='#5B6171' size={'25px'} icon={FaSignOutAlt} aria-label="Sign out" />
        </HStack>
        </HStack>
    </header>
  )
}