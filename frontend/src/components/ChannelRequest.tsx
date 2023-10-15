"use client";
import { Avatar, Button, Wrap, Text } from '@chakra-ui/react';
import React from 'react'
import IconButton from './IconButton';
import {IoClose} from "react-icons/io5"
import {FaCheck} from "react-icons/fa"

type Props = {
    channelPic: string;
    channelName: string;
}

const ChannelRequest = ({channelName, channelPic}: Props) => {
  return (
    <Button variant={"field"} w={"500px"} h={"74px"}>
      <Wrap align={"center"} spacing={"130px"}>
        <Avatar src={channelPic} boxSize={"50px"}></Avatar>
        <Text fontSize={"20px"}>{channelName}</Text>
        <Wrap spacing={"8px"} align={"center"}>
          <IconButton size="20px" icon={FaCheck}/>
          <IconButton size="28px" icon={IoClose}/>
        </Wrap>
      </Wrap>
    </Button>
  )
}

export default ChannelRequest