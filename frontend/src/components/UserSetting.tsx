"use client"
import {Box, Stack, Avatar, Button, Input, Wrap, Text, Icon } from '@chakra-ui/react'
import React, { useState } from 'react'
import ScrollableStack from './ScrollableStack'
import InputStack from './InputStack'
import { FaPen } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'
import apiClient from '@/services/requestProcessor'
import { useQueryClient } from 'react-query'
import { useUpdateCurrentUser } from '@/hooks/useUpdateCurrentUser'

type Props = {}

const UserSetting = (props: Props) => {
  const {currentUser, updateUser} = useAuth();
  const queryClient = useQueryClient();
  const client = new apiClient("/users")
  const [newAvatar, setNewAvatar] = useState(currentUser.avatar);
  
  const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentFiles = event.target.files
    if (currentFiles && currentFiles?.length > 0){
      let src: string = URL.createObjectURL(currentFiles[0]);
      setNewAvatar(src)
    }
  }
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement);
    const userName: string = formData.get("username") as string;
    const imageFile = (document.getElementById('avatar') as HTMLInputElement).files?.[0];
    if (userName !== "" && imageFile)
    {
      client.patchData(formData).then(() => {
        useUpdateCurrentUser({updateUserCookie: () => {
          console.log("I hope")
          updateUser && updateUser();
        }});
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack py={"15%"} align={"center"} spacing={"6%"} w={{ base: "225px", md: "335px", lg: "465px"}} h={"80vh"} bg={"#1D222C"} px={{base: "25px", md: "45px" }} borderRadius={"20px"}>
        <Input onChange={handlePreview} visibility={"hidden"} w={0} h={0} type='file' id='avatar' name='avatar'/>
        <Wrap align={"end"} position={"relative"}>
          <Avatar zIndex={0} boxSize={{base: "100px", xl: "137px" }} src={newAvatar}></Avatar>
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
        <Input variant={"secondary"} w={"full"} h={{base: "37", md: "57px" }} placeholder={currentUser.username}></Input>
        {/* <Text fontSize={"17px"} >Enable 2FA</Text> */}
        <Button
          type='submit'
          variant={"secondary"}
          width={"40%"}
          height={{base: "30px", lg: "50px" }}
          fontSize={{base: "10px", md: "12px", lg: "17px" }}
          >Confirm</Button>
      </Stack>
    </form>
  )
}

export default UserSetting