"use client";
import Logo from "@/components/Logo"
import { Button, Icon, Stack } from "@chakra-ui/react"
import ButtonStack from "@/components/ButtonStack"
import { BsGoogle } from "react-icons/bs"

export default function Home() {
  return (
    <Stack
    spacing={"300px"}
    direction="column"
    align="center"
    justify="center"
    minH="70vh"
    >
    <Logo src="/logo.png" width="334px" height="179px"></Logo>
    <ButtonStack
      buttons={["Log in with", "Log in with"]}
      style={["primary", "secondary"]}
      width="300px"
      height="70px"
      spaceBetween="15px"
      onClick={[() => {}]}
      Icons={[<Icon as={BsGoogle} style={{ fontSize: "35px" }}/>]}
      fontSize="22px"
    />
  </Stack>
  )
}
