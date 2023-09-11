'use client'
import React, {useState} from 'react'
import { Stack, Box, HStack } from '@chakra-ui/react'
import ChatSection from '@/components/ChatComponents/ChatSection'

export default function page() {
  return (
    <Stack justify={'center'} alignItems={'center'} w='100%' h='100%'>
      <ChatSection />
    </Stack>
  )
}
