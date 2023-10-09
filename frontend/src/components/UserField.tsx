"use client";
import { Spacer, Avatar, Button, Wrap, Text, Flex } from '@chakra-ui/react';
import React from 'react'
import IconButton from './IconButton';
import {FaMessage} from "react-icons/fa6"
import {SlOptions} from "react-icons/sl"

type Props = {
    userPic: string;
    userName: string;
}

const UserField = ({userName, userPic}: Props) => {
  return (
    <Button variant={"field"} p={"15px"} w={"95%"} h={{sm: "40px", md: "50px", lg: "70px" }}>
      <Flex alignItems={"center"} width={"full"}>
        <Avatar src={userPic} boxSize={{base: "20px",md: "30px", lg: "50px"}}></Avatar>
        <Spacer/>
        <Text fontSize={{base: "10px",md: "15px", lg: "20px"}}>{userName}</Text>
        <Spacer/>
        <Wrap spacing={"8px"} align={"center"}>
          <IconButton size={"20px"} icon={FaMessage}/>
          <IconButton size={"20px"} icon={SlOptions}/>
        </Wrap>
      </Flex>
    </Button>
  )
}

export default UserField