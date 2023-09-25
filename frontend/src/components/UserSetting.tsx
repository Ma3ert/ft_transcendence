"use client"
import { Stack, Avatar, Button } from '@chakra-ui/react'
import React from 'react'
import ScrollableStack from './ScrollableStack'
import InputStack from './InputStack'

type Props = {}

const UserSetting = (props: Props) => {
  return (
    <Stack align={"center"} spacing={"44px"} w={"468px"} h={"580px"} maxH={'65vh'} bg={"#1D222C"} py={"45px"} borderRadius={"20px"}>
        <Avatar boxSize={"105px"}></Avatar>
        <InputStack
          placeholder={["new username", "last name", "first name"]}
          style='secondary'
          width={["365px", "365px", "365px"]}
          height={["57px", "57px", "57px"]}
          spaceBetween='25px'
          state={[false, true, true]}
        />
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