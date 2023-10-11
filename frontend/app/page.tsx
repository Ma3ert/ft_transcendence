"use client";
import Logo from "@/components/Logo"
import { Button, Icon, Stack, Image, Wrap, Text } from "@chakra-ui/react"
import ButtonStack from "@/components/ButtonStack"
import { BsGoogle } from "react-icons/bs"
import Link from "next/link";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";

export default function Home() {

  return (
    <Stack
    spacing={"20vh"}
    direction="column"
    align="center"
    justify="center"
    minH="70vh"
    >
      <Logo src="/logo.png" width="334px" height="179px"></Logo>
      <Link href={"http://127.0.0.1:3000/auth/42/login"}>
        <Button variant={"primary"} 
          width={{ base: "200px", lg: "250px", xl: "300px" }} 
          height={{base: "60px", lg: "70px", xl: "80px" }}
        > 
          <Wrap align={"center"} spacing={"20px"}>
            <Text fontSize={{base: "18px", lg: "20", xl: "24px" }} >Log in with</Text>
            <Image marginTop={"6px"} src="/42_Logo.png" boxSize={{base: "30px", lg: "35px", xl: "40px" }}/>
          </Wrap>
        </Button>
      </Link>
    </Stack>
  )
}
