"use client"
import { Stack, Avatar, Button, Input, Wrap, Text } from '@chakra-ui/react'
import React from 'react'
import ScrollableStack from './ScrollableStack'
import InputStack from './InputStack'

type Props = {}

const UserSetting = (props: Props) => {
  return (
    <Stack align={"center"} spacing={"44px"} w={{ base: "225px", md: "335px", lg: "465px"}} h={"580px"} bg={"#1D222C"} py={{base: "25px", md: "45px" }} borderRadius={"20px"}>
        <Avatar boxSize={{base: "70px", md: "80px", lg: "105px"}}></Avatar>
        <Input variant={"secondary"} w={{base: "168px", md: "265px", lg: "365px"}} h={{base: "37", md: "57px" }} placeholder='new username'></Input>
        {/* <Text fontSize={"17px"} >Enable 2FA</Text> */}
        <Button 
          variant={"secondary"}
          width={{base: "100px", md: "120px", lg: "160px" }}
          height={{base: "20px", md: "30px", lg: "50px" }}
          fontSize={{base: "10px", md: "12px", lg: "17px" }}
        >Confirm</Button>
    </Stack>
  )
}

export default UserSetting