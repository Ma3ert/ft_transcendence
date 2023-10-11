"use client";
import Logo from "@/components/Logo"
import { Button, Icon, Stack, Image, Wrap, Text } from "@chakra-ui/react"
import ButtonStack from "@/components/ButtonStack"
import { BsGoogle } from "react-icons/bs"
import Link from "next/link";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";

export default function Home() {
  const auth = () => {
    const client = new apiClient("/auth/42/login")
    const query = useQuery({
      queryKey: ["auth"], 
      queryFn: () => { client.getData() }
    })
    if (query.isLoading) return console.log("loading")
    if (query.isSuccess) return console.log(query.data)
  }
  return (
    <Stack
    spacing={"300px"}
    direction="column"
    align="center"
    justify="center"
    minH="70vh"
    >
    <Logo src="/logo.png" width="334px" height="179px"></Logo>
    <Link href={"/ChangeUserName"}>
      <Button variant={"primary"} width="300px" height="80px" fontSize={"22px"} onClick={() => {auth}}> 
        <Wrap align={"center"} spacing={"20px"}>
          <Text fontSize={"24px"} >Log in with</Text> <Image marginTop={"6px"} src="/42_Logo.png" w={"40px"} h={"40px"}/>
        </Wrap>
      </Button>
    </Link>
  </Stack>
  )
}
