"use client";
import { Stack } from '@chakra-ui/react'
import IconButton from './IconButton'
import {AiFillHome} from "react-icons/ai"
import {BiSolidBell} from "react-icons/bi"
import {FaMedal} from "react-icons/fa"
import {FaUserGroup} from "react-icons/fa6"
import {IoMdSettings} from "react-icons/io"

interface Props {
  bodySetter: React.Dispatch<React.SetStateAction<number>>
}

const SideBar = ({bodySetter} : Props) => {
  const size = "40px";
  return (
    <Stack spacing={"90px"} w={"60px"}>
      <IconButton onClick={() => (bodySetter(0))} icon={AiFillHome} size={size}/> 
      <IconButton onClick={() => (bodySetter(0))} icon={BiSolidBell} size={size}/>
      <IconButton onClick={() => (bodySetter(1))} icon={FaMedal} size={size}/>
      <IconButton onClick={() => (bodySetter(2))} icon={FaUserGroup} size={size}/>
      <IconButton onClick={() => (bodySetter(3))} icon={IoMdSettings} size={size}/>
    </Stack>
  )
}

export default SideBar