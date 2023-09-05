'use client'
import React from 'react'
import { Stack, Box, HStack } from '@chakra-ui/react'
import ChatLobbyToggler from '../../src/components/ChatComponents/ChatLobbyToggler'
import ChannelToggler from '@/components/ChatComponents/ChannelToggler'
import FriendsList from '@/components/ChatComponents/FriendsList'
import {friendsList} from '../../contstants'
import ChannelSettings from '@/components/ChatComponents/ChannelSettings'
import ChannelChat from '@/components/ChatComponents/ChannelChat'
export default function page() {
  return (
    <Stack justify={'center'} alignItems={'center'} w='100%' h='100%'>
      <ChatLobbyToggler  />
      <HStack w='100%' h='100%'  justify={'space-around'} alignItems={'center'}>
        <Stack justify='start' alignItems={'center'}  w={'20%'} h='100%' >
          <ChannelToggler />
          <FriendsList friends={friendsList} />
        </Stack>
        <Box flex={1}  h='100%'>
          <ChannelChat/>
        </Box>
        <Box h='100%' w='25%'>
          <ChannelSettings />
        </Box>
      </HStack>
    </Stack>
  )
}
