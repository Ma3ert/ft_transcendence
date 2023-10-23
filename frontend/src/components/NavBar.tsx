import { Avatar, Flex, Wrap, Spacer } from '@chakra-ui/react'
import React from 'react'
import IconButton from './IconButton'
import {FaSignOutAlt} from "react-icons/fa"
import Logo from './Logo'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import apiClient from '@/services/requestProcessor'
import Cookies from 'js-cookie'

const NavBar = () => {
  const {currentUser, updateUser} = useAuth()
  const router = useRouter();

  if (!currentUser)
    router.push("/");

  const handleLogout = () => {
    router.push("http://localhost:3000/auth/42/logout");
    // Cookies.remove('jwt');
  }

  return (
    <Flex as={"nav"} alignItems={"center"} w={"full"} margin={"auto"} p={"10px"}>
      <Logo
        src='/logo.png'
        width={{ base: "188px", lg: '246px' }}
        height={{base: "93px", lg: '121px'}}
        ></Logo>
      <Spacer/>
      <Wrap align={"center"} spacing={{base: "30px", lg: "40px" }}>
        <Avatar src={currentUser.user.avatar} boxSize={{base: "40px", lg: "60px"}}></Avatar>
        <IconButton
          icon={FaSignOutAlt}
          size="40px"
          aria-label="Sign out"
          onClick={handleLogout}
        />
      </Wrap>
    </Flex>
  )
}

export default NavBar