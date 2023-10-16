"use client";
import { Avatar, Button, Input, Stack, Wrap, Box, Icon } from '@chakra-ui/react'
import Logo from "@/components/Logo"
import { useState } from 'react';
import Link from 'next/link';
import apiClient from '@/services/requestProcessor';
import { AxiosResponse } from 'axios';
import {FaPen} from "react-icons/fa"
import { useRouter } from "next/navigation";
import { useAuth } from '@/hooks/useAuth';
import {useUpdateCurrentUser} from "@/hooks/useUpdateCurrentUser"
import Cookies from 'js-cookie';
import { useQuery, useQueryClient } from 'react-query';

export default function Home() {
  const router = useRouter()
  const client = new apiClient("/users");
  const {currentUser, updateUser} = useAuth(); 
  const [newAvatar, setNewAvatar] = useState(currentUser ? currentUser.avatar : "")

  updateUser && updateUser()

  const handleSkip = () => {
    const formData = new FormData();
    formData.append("activated", "true")
    client.patchData(formData).then(() => {
      router.push("/Lobby");
    })
  }

  const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentFiles = event.target.files
    if (currentFiles && currentFiles?.length > 0){
      let src: string = URL.createObjectURL(currentFiles[0]);
      setNewAvatar(src)
    }
  }

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement);
    const userName: string = formData.get("username") as string;
    const imageFile = (document.getElementById('avatar') as HTMLInputElement).files?.[0];
    formData.append("activated", "true")
    if (userName !== "" && imageFile)
    {
      client.patchData(formData).then(() => {
        client.getData("/me").then((res: AxiosResponse)=> {
          console.log("query function is fired")
          console.log(res.data.data)
          Cookies.set('currentUser', JSON.stringify(res.data.data));
          console.log("the cookie is set");
          updateUser && updateUser()
          router.push("/Lobby")
      }).catch((err) => (console.log(err)))
      })
    }
    else {
      router.push("/Lobby");
    }
  }
  
  if (currentUser && currentUser.activated)
    router.push("/Lobby")
  
  return (
    <Stack
    spacing={"10vh"}
      align="center"
      minH="70vh"
      >
        <Logo src='/logo.png' width="334px" height="179px"></Logo>
        <form onSubmit={handleOnSubmit}>
          <Stack align={"center"} spacing={"40px"}>
            <Stack align={"center"} spacing={{base: "10px" ,lg:"20px" }}>
              <Input onChange={handlePreview} visibility={"hidden"} w={0} h={0} type='file' id='avatar' name='avatar'/>
              <Wrap align={"end"} position={"relative"}>
                <Avatar zIndex={0} boxSize={{base: "100px", xl: "137px" }} 
                  src={newAvatar}></Avatar>
                <Box
                  as='label'
                  htmlFor='avatar'
                  zIndex={1}
                  boxSize={"30px"} 
                  borderRadius={"full"}
                  bg={"#DC585B"} color={"#fff"} 
                  display={"flex"} alignItems={"center"} justifyContent={"center"}
                  position={"absolute"}
                  left={"70%"}
                >
                  <Icon as={FaPen} style={{ fontSize: "14px" }} />
                </Box>
              </Wrap>
            </Stack>
            <Stack align={"center"} spacing={{base: "10px" ,lg:"20px" }}>
              <Input
                id='username'
                name='username'
                variant={"default"}
                w={{ base: "280px", lg: "340px" }}
                h={{ base: "50px",lg: "66px" }}
                placeholder={currentUser ? currentUser.username : "new username"}/>
              <Stack align={"center"} spacing={{base: "6px", lg:"8px" }}>
                <Button
                  fontSize={{base: "15px", lg: "20px" }}
                  variant={"ghost"}
                  type='submit'
                >Apply Changes</Button>
                <Button
                  fontSize={{base: "15px", lg: "20px" }}
                  variant={"ghost"}
                  onClick={handleSkip}
                  >skip</Button>
              </Stack>
            </Stack>
          </Stack>
        </form>
    </Stack>
  )
}