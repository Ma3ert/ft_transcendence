import { Avatar, Wrap } from '@chakra-ui/react'
import React from 'react'
import IconButton from './IconButton'
import {FaSignOutAlt} from "react-icons/fa"
import Logo from './Logo'
import Link from 'next/link'

const NavBar = () => {
  return (
    <Wrap align={"center"} spacingX={"1000px"} marginTop={"50px"}>
      <Logo
        src='/logo.png'
        width='246px'
        height='121px'
      ></Logo>
      <Wrap align={"center"} spacing={"50px"}>
        <Avatar boxSize={"60px"}></Avatar>
        <IconButton
          icon={FaSignOutAlt}
          size="40px"
        />
      </Wrap>
    </Wrap>
  )
}

export default NavBar