"use client";
import { Avatar, Button, Wrap, Text, Flex, Spacer } from '@chakra-ui/react';
import React from 'react'
import IconButton from './IconButton';
import {FaMessage} from "react-icons/fa6"
import {SlOptions} from "react-icons/sl"
import UserAvatar from './UserAvatar';

type Props = {
    userPic: string;
    userName: string;
    rank: number;
    variant: string;
    key: number;
    lvl: number;
    xp: number;
}

const UserRankField = ({key, userName, userPic, rank, variant="field", lvl, xp}: Props) => {
  return (
    <Button key={key} variant={variant} w={"95%"} h={{sm: "40px", md: "50px", lg: "70px" }} p={"15px"}>
      <Flex alignItems={"center"} width={"full"}>
        <Wrap align={"center"} spacing={"15px"}>
          <Text fontSize={{base: "8px",md: "10px", lg: "15px"}}>{rank}</Text>
          <Avatar src={userPic} boxSize={{base: "20px",md: "30px", lg: "50px"}}></Avatar>
        </Wrap>
        <Spacer/>
        <Text fontSize={{base: "10px",md: "15px", lg: "20px"}}>{userName}</Text>
        <Spacer/>
        <Wrap spacing={{base: "20px", lg: "40px" }} align={"center"} w={"130px"}>
          <Text fontSize={{base: "8px",md: "10px", lg: "15px"}}>{"lvl " + lvl}</Text>
          <Text fontSize={{base: "8px",md: "10px", lg: "15px"}}>{xp + "xp"}</Text>
        </Wrap>
      </Flex>
    </Button>
  )
}

export default UserRankField