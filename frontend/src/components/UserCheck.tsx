"use client";
import { Avatar, Button, Wrap, Text, Checkbox } from '@chakra-ui/react';
import React, { useState } from 'react'
import IconButton from './IconButton';
import {FaMessage} from "react-icons/fa6"
import {SlOptions} from "react-icons/sl"

type Props = {
    userPic: string;
    userName: string;
}

const UserCheck = ({userName, userPic}: Props) => {
  const [checked, setCheckState] = useState(false);
  const checkbox = (event: React.ChangeEvent<HTMLInputElement>) =>{
    event.target.checked ? setCheckState(false) : setCheckState(true)
  }
  return (
    <Button variant={"field"} w={"269px"} h={"43px"} onClick={() => (checked ? setCheckState(false) : setCheckState(true))}>
      <Wrap w={"80%"} align={"center"} spacing={"60px"} justify={"space-between"}>
        <Avatar src={userPic} boxSize={"30px"}></Avatar>
        <Text fontSize={"13px"}>{userName}</Text>
        <Checkbox isChecked={checked} variant={"default"} onChange={checkbox}></Checkbox>
      </Wrap>
    </Button>
  )
}

export default UserCheck