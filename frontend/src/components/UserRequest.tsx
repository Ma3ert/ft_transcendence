"use client";
import { Avatar, Button, Wrap, Text, Flex, Spacer } from '@chakra-ui/react';
import React from 'react'
import IconButton from './IconButton';
import {IoClose} from "react-icons/io5"
import {FaCheck} from "react-icons/fa"

type Props = {
    userPic: string;
    userName: string;
}

const UserRequest = ({userName, userPic}: Props) => {
  return (
    <Button variant={"field"} p={"15px"} w={"95%"} h={{sm: "40px", md: "50px", lg: "70px" }}>
      <Flex alignItems={"center"} width={"full"}>
        <Avatar src={userPic} boxSize={{base: "20px",md: "30px", lg: "50px"}}></Avatar>
        <Spacer/>
        <Text fontSize={{base: "10px",md: "15px", lg: "20px"}}>{userName}</Text>
        <Spacer/>
        <Wrap spacing={"8px"} align={"center"}>
          <IconButton size={"20px"} icon={FaCheck}/>
          <IconButton size={"28px"} icon={IoClose}/>
        </Wrap>
      </Flex>
    </Button>
  )
}

export default UserRequest