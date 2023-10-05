import { Avatar, Flex, Wrap, Spacer } from '@chakra-ui/react'
import React from 'react'
import IconButton from './IconButton'
import {FaSignOutAlt} from "react-icons/fa"
import Logo from './Logo'
import Link from 'next/link'

const NavBar = () => {
  return (
    // <Wrap align={"center"} spacingX={"1000px"} marginTop={"50px"} color={"#5B6171"}>
    <Flex as={"nav"} alignItems={"center"} w={"auto"} maxW={{sm: "100%", md: "80%", lg:"60%"}} margin={"auto"} p={"10px"}>
      <Logo
        src='/logo.png'
        width='246px'
        height='121px'
        ></Logo>
        <Spacer/>
      <Wrap align={"center"} spacing={"40px"}>
        <Avatar boxSize={"60px"}></Avatar>
        <IconButton
          icon={FaSignOutAlt}
          size="40px"
          aria-label="Sign out"
          />
      </Wrap>
    </Flex>
    // </Wrap>
  )
}

export default NavBar