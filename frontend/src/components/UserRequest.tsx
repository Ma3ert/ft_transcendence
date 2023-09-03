"use client";
import { Avatar, Button, Wrap, Text } from '@chakra-ui/react';
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
    <Button variant={"field"} w={"500px"} h={"74px"}>
      <Wrap align={"center"} spacing={"130px"}>
        <Avatar src={userPic} boxSize={"50px"}></Avatar>
        <Text fontSize={"20px"}>{userName}</Text>
        <Wrap spacing={"8px"} align={"center"}>
          <IconButton size="20px" icon={FaCheck}/>
          <IconButton size="28px" icon={IoClose}/>
        </Wrap>
      </Wrap>
    </Button>
  )
}

export default UserRequest