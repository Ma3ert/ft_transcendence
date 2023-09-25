'use client'
import React from 'react'
import { Box, Text } from '@chakra-ui/react'

export default function loading() {
  return (
    <Box w='100%' h='100%' display={'flex'} justifyContent={'center'} alignItems='center'>
       <Text color='white'>Loading...</Text>
    </Box>
  )
}
