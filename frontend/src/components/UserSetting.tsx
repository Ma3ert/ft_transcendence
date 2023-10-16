"use client"
import {Box, Stack, Avatar, Button, Input, Wrap, Text, Icon, Flex, Spacer } from '@chakra-ui/react'
import React, { useState } from 'react'
import ScrollableStack from './ScrollableStack'
import InputStack from './InputStack'
import { FaPen } from 'react-icons/fa'
import { useAuth } from '@/hooks/useAuth'
import apiClient from '@/services/requestProcessor'
import { useQueryClient } from 'react-query'
import { useUpdateCurrentUser } from '@/hooks/useUpdateCurrentUser'
import { AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import CostumSwitcher from './ChatComponents/CostumSwitcher'

type Props = {}

const client = new apiClient("/users")
const UserSetting = (props: Props) => {
  const {currentUser, updateUser} = useAuth();
  const [faState, faStateSetter] = useState(currentUser.twoFactor);
  const queryClient = useQueryClient();
  const [newAvatar, setNewAvatar] = useState(currentUser.avatar);

  console.log("currentUser from the setting: ", currentUser);
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
        updateUser && updateUser();
      })
    }
  }

  const activateFa = () => {
    const patchClient = new apiClient("/auth/twoFactor")
    var toSend = {"activate": faState}

    console.log("two fa pressed")
    if (!faState){
      toSend.activate = true;
    }
    patchClient.patchData(toSend, "").then(() => {
      updateUser && updateUser();
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack py={"15%"} align={"center"} spacing={"6%"} w={{ base: "225px", md: "335px", lg: "465px"}} h={"80vh"} bg={"#1D222C"} px={{base: "25px", md: "45px" }} borderRadius={"20px"}>
        <Input onChange={handlePreview} visibility={"hidden"} w={0} h={0} type='file' id='avatar' name='avatar'/>
        <Wrap align={"end"} position={"relative"}>
          <Avatar zIndex={0} boxSize={{base: "100px", xl: "137px" }} src={newAvatar === "" ? currentUser.avatar : newAvatar}></Avatar>
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
        <Flex w={"full"} px={"10px"}>
          <Text fontFamily={"visbyRound"} fontSize={"15px"} color={"#fff"}>Enable 2FA</Text>
          <Spacer/>
          <CostumSwitcher state={faState} stateSetter={faStateSetter} onClick={activateFa}/>
        </Flex>
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