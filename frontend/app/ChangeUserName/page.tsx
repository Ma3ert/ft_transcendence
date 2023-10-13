"use client";
import { Avatar, Button, Input, Stack, Wrap, Box, Icon, WrapItem, FormControl } from '@chakra-ui/react'
import {FaArrowCircleRight} from "react-icons/fa"
import IconButton from '@/components/IconButton';
import Logo from "@/components/Logo"
import { useContext, useState } from 'react';
import Link from 'next/link';
import {AuthUser} from "@/context/Contexts"
import apiClient from '@/services/requestProcessor';
import axios, { AxiosResponse } from 'axios';
import {FaPen} from "react-icons/fa"
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const client = new apiClient("/users");
  const [send, setSend] = useState("");
  const { currentUser, setCurrentUser } = useContext(AuthUser)
  const [newAvatar, setNewAvatar] = useState("");

  if (currentUser === null)
  {
    client.getData("/me").then((res: AxiosResponse)=> {
      setCurrentUser(res.data.data)
      if (res.data.data.activated)
        router.push("/Lobby")
      const avatar: string = res.data.data.avatar
      if (!avatar.includes("http"))
      {
        setNewAvatar("http://localhost:3000/public/users/imgs/" + res.data.data.avatar)
        console.log("avatar: ", avatar)
      }
      else
        setNewAvatar(avatar)
    }).catch((err) => (console.log(err)))
  }

  const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files)
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
    // const image: string | undefined = imageFile ? imageFile.name : undefined;
    if (userName !== "" && imageFile)
      client.patchData(formData).then(() => (router.push("/Lobby")))
    else {
      router.push("/Lobby");
    }
    // console.log("username:", userName);
    // console.log("image:", image);
  }

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
                placeholder={currentUser ? currentUser.username : 'new Username'}/>
              <Stack align={"center"} spacing={{base: "6px", lg:"8px" }}>
                <Button
                  fontSize={{base: "15px", lg: "20px" }}
                  variant={"ghost"}
                  type='submit'
                >Apply Changes</Button>
                <Link href={"/Lobby"}>
                  <Button
                    fontSize={{base: "15px", lg: "20px" }}
                    variant={"ghost"}
                    >skip</Button>
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </form>
    </Stack>
  )
}