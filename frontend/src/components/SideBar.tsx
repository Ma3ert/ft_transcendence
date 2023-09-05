"use client";
import { Stack } from '@chakra-ui/react'
import IconButton from './IconButton'
import {AiFillHome} from "react-icons/ai"
import {BiSolidBell} from "react-icons/bi"
import {FaMedal} from "react-icons/fa"
import {FaUserGroup} from "react-icons/fa6"
import {IoMdSettings} from "react-icons/io"

const SideBar = () => {
  const size = "25px";
  return (
    <Stack spacing={10}>
      <IconButton color='#5B6171' icon={AiFillHome} size={size}/> 
      <IconButton color='#5B6171' icon={BiSolidBell} size={size}/>
      <IconButton color='#5B6171' icon={FaMedal} size={size}/>
      <IconButton color='#5B6171' icon={FaUserGroup} size={size}/>
      <IconButton color='#5B6171' icon={IoMdSettings} size={size}/>
    </Stack>
  )
}

export default SideBar