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

const UserRankField = ({userName, userPic}: Props) => {
  return (
    <Button variant={"field"} w={"500px"} h={"74px"}>
      <Wrap align={"center"} spacing={"100px"}>
        <Wrap align={"center"} spacing={"15px"}>
          <Text fontSize={"15px"}>N#</Text>
          <Avatar src={userPic} boxSize={"50px"}></Avatar>
        </Wrap>
        <Text fontSize={"20px"}>{userName}</Text>
        <Wrap spacing={"40px"} align={"center"}>
          <Text fontSize={"15px"}>lvl</Text>
          <Text fontSize={"15px"}>xp</Text>
        </Wrap>
      </Wrap>
    </Button>
  )
}

export default UserRankField