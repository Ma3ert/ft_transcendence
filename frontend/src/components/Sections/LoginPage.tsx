"use client";
import Logo from "@/components/Logo";
import { Button, Icon, Stack, Image, Wrap, Text } from "@chakra-ui/react";
import ButtonStack from "@/components/ButtonStack";
import { BsGoogle } from "react-icons/bs";
import Link from "next/link";
import { useContext } from "react";
import { GlobalContext } from "@/context/Contexts";

export default function LoginPage() {
  const { setAuthenticated } = useContext(GlobalContext);
  const handleLogin = () => {
    setAuthenticated!(true);
  };
  return (
    <Stack
      spacing={"300px"}
      direction="column"
      align="center"
      justify="center"
      minH="70vh"
    >
      <Logo src="/logo.png" width="334px" height="179px"></Logo>
      <Button variant={"primary"} width="300px" height="80px" fontSize={"22px"} onClick={handleLogin}>
        <Wrap align={"center"} spacing={"20px"}>
          <Text fontSize={"24px"}>Log in with</Text>{" "}
          <Image marginTop={"6px"} src="/42_Logo.png" w={"40px"} h={"40px"} />
        </Wrap>
      </Button>
    </Stack>
  );
}
