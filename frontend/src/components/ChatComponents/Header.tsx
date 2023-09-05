import { HStack, Text, transition } from '@chakra-ui/react'
import React from 'react'
import Logo from '../Logo'
import Link from 'next/link'
import { Icon } from '@chakra-ui/react'
import { FaSignOutAlt } from 'react-icons/fa'
import UserStatus from '../../components/UserStatus'
import UserAvatar from '../../components/UserAvatar'
import IconButton  from '../../components/IconButton'
export default function Header() {
  return (
    <header>
        <HStack justify={'space-between'} p={4} mx={'auto'}>
        <Logo src="/logo.png" width="120px" height="auto"/>

        <HStack justify='center' alignItems='center' spacing={12} maxW={'6xl'}>
            <UserStatus username='yassiiiiir12' status={true}/>
            <UserAvatar url='https://avatars.githubusercontent.com/u/55942632?v=4' status={true}/>
             <IconButton color='#5B6171' size={'25px'} icon={FaSignOutAlt} aria-label="Sign out" />
        </HStack>
        </HStack>
    </header>
  )
}
