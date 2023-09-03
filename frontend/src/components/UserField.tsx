"use client";
import { Avatar, Button, Wrap, Text } from '@chakra-ui/react';
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
    <Button variant={"field"} w={"500px"} h={"74px"}>
      <Wrap align={"center"} spacing={"130px"}>
        <Avatar src={userPic} boxSize={"50px"}></Avatar>
        <Text fontSize={"20px"}>{userName}</Text>
        <Wrap spacing={"8px"} align={"center"}>
          <IconButton size="20px" icon={FaMessage}/>
          <IconButton size="20px" icon={SlOptions}/>
        </Wrap>
      </Wrap>
    </Button>
  )
}

export default UserField