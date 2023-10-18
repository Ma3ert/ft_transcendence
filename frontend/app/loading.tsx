'use client'
import React from 'react'
import { Box, Text , Stack, Spinner} from '@chakra-ui/react'

export default function Loading() {
  return (
   <Stack w='100vw' h='100vh' justifyContent={'center'} alignItems={'center'}>
    <Spinner
    thickness='6px'
    speed='0.65s'
    emptyColor='#5B6171'
    color='#DC585B'
    size='xl'
/>
   </Stack>
  )
}
