"use client"
import { Stack, Avatar, Button, Input, Wrap, Text } from '@chakra-ui/react'
import React from 'react'
import ScrollableStack from './ScrollableStack'
import InputStack from './InputStack'

type Props = {}

const UserSetting = (props: Props) => {
  return (
    <Stack align={"center"} spacing={"44px"} w={"468px"} h={"580px"} bg={"#1D222C"} py={"45px"} borderRadius={"20px"}>
        <Avatar boxSize={"105px"}></Avatar>
        <Input variant={"secondary"} w={"365px"} h={"57px"} placeholder='new username'></Input>
        <Wrap align={"center"}>
          <Text fontSize={"17px"} >Enable 2FA</Text>
        </Wrap>
        <Button 
          variant={"secondary"}
          width={"160px"}
          height={"50px"}
          fontSize={"17px"}
        >confirm</Button>
    </Stack>
  )
}

export default UserSetting