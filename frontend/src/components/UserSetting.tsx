"use client"
import { Stack, Avatar, Button, Input, Wrap, Text } from '@chakra-ui/react'
import React from 'react'
import ScrollableStack from './ScrollableStack'
import InputStack from './InputStack'

type Props = {}

const UserSetting = (props: Props) => {
  return (
    <Stack align={"center"} spacing={"44px"} w={{ base: "225px", md: "335px", lg: "465px"}} h={"580px"} bg={"#1D222C"} px={{base: "25px", md: "45px" }} borderRadius={"20px"}>
        <Stack align={"center"} spacing={"10px"}>
          <Avatar boxSize={{base: "70px", md: "80px", lg: "100px"}}></Avatar>
          <Button variant={"ghost"} fontSize={{ base: "15px", lg: "17px" }} >Change</Button>
        </Stack>
        <Input variant={"secondary"} w={"full"} h={{base: "37", md: "57px" }} placeholder='new username'></Input>
        {/* <Text fontSize={"17px"} >Enable 2FA</Text> */}
        <Button 
          variant={"secondary"}
          width={"40%"}
          height={{base: "30px", lg: "50px" }}
          fontSize={{base: "10px", md: "12px", lg: "17px" }}
        >Confirm</Button>
    </Stack>
  )
}

export default UserSetting