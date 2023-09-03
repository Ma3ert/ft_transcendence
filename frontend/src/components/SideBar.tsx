"use client";
import { Stack } from '@chakra-ui/react'
import IconButton from './IconButton'
import {AiFillHome} from "react-icons/ai"
import {BiSolidBell} from "react-icons/bi"
import {FaMedal} from "react-icons/fa"
import {FaUserGroup} from "react-icons/fa6"
import {IoMdSettings} from "react-icons/io"

const SideBar = () => {
  const size = "40px";
  return (
    <Stack spacing={"90px"}>
      <IconButton icon={AiFillHome} size={size}/> 
      <IconButton icon={BiSolidBell} size={size}/>
      <IconButton icon={FaMedal} size={size}/>
      <IconButton icon={FaUserGroup} size={size}/>
      <IconButton icon={IoMdSettings} size={size}/>
    </Stack>
  )
}

export default SideBar