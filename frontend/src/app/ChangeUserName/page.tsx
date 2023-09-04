"use client";
import { Avatar, Button, Input, Stack, Wrap } from '@chakra-ui/react'
import {FaArrowCircleRight} from "react-icons/fa"
import IconButton from '@/components/IconButton';
import Logo from "@/components/Logo"
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [send, setSend] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
    event.target.value.length >= 1 ? setSend(1) : setSend(0);
  }

  return (
    <Stack
      spacing={"200px"}
      direction="column"
      align="center"
      justify="center"
      minH="75vh"
      >
        <Logo src='/logo.png' width="334px" height="179px"></Logo>
        <Stack align={"center"} spacing={"40px"}>
          <Avatar boxSize={"137px"}></Avatar>
          <Stack align={"center"} spacing={"20px"}>
            <Wrap marginLeft={"60px"} align={"center"} spacing={"18px"}>
              <Input 
                variant={"default"}
                w={"340px"}
                h={"66px"}
                onChange={handleInputChange}
                placeholder='new Username'/>
                <Link href={"/Lobby"}>
                  <IconButton
                    icon={FaArrowCircleRight}
                    size="44px"/>
                </Link>
            </Wrap>
            <Link href={"/Lobby"}>
              <Button
                fontSize={"20px"}
                variant={"ghost"}
                >skip</Button>
            </Link>
          </Stack>
        </Stack>
    </Stack>
  )
}