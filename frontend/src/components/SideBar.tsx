"use client";
import { Stack } from '@chakra-ui/react'
import IconButton from './IconButton'
import {AiFillHome} from "react-icons/ai"
import {BiSolidBell} from "react-icons/bi"
import {FaMedal} from "react-icons/fa"
import {FaUserGroup} from "react-icons/fa6"
import {IoMdSettings} from "react-icons/io"
import Link from 'next/link';

interface Props {
  bodySetter?: React.Dispatch<React.SetStateAction<number>>
}

const SideBar:React.FC<Props> = ({bodySetter}) => {
  const size = "35px";
  return (
    <Stack spacing={10}>
      <Link href='/'>
        <IconButton color='#5B6171' onClick={()=>{bodySetter && bodySetter (0)} } icon={AiFillHome} size={size}/> 
      </Link>
      <Link href='/notifications'> 
        <IconButton color='#5B6171' onClick={()=>{bodySetter && bodySetter (0)} }icon={BiSolidBell} size={size}/>
      </Link>
      <Link href='/acheivements'>
      <IconButton color='#5B6171' onClick={()=>{bodySetter && bodySetter (1)}}icon={FaMedal} size={size}/>
      </Link>
      <Link href='/chat'>
      <IconButton color='#5B6171' onClick={()=>{bodySetter && bodySetter (2)}}icon={FaUserGroup} size={size}/>
      </Link>
      <Link href='/settings'>
      <IconButton color='#5B6171' onClick={()=>{bodySetter && bodySetter (3)}}icon={IoMdSettings} size={size}/>
      </Link>
    </Stack>
  )
}

export default SideBar