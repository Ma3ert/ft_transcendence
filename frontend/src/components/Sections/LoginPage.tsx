"use client";
import Logo from "@/components/Logo";
import { Button, Icon, Stack, Image, Wrap, Text } from "@chakra-ui/react";
import { BsGoogle } from "react-icons/bs";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context/Contexts";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/services/requestProcessor";

export default function LoginPage() {
  const router = useRouter();
  const { currentUser, updateUser } = useAuth();
  if (
    currentUser &&
    currentUser.user.activated &&
    (!currentUser.user.twoFactor || currentUser.user.pinValidated)
  )
    router.push("/Lobby");
  else 
    return (
      <Stack
        spacing={"20vh"}
        direction="column"
        align="center"
        justify="center"
        minH="70vh"
      >
        <Logo src="/logo.png"></Logo>
        <Link href={"http://e1r8p2.1337.ma:3000/auth/42/login"}>
          <Button
            variant={"primary"}
            width={{ base: "200px", lg: "250px", xl: "300px" }}
            height={{ base: "60px", lg: "70px", xl: "80px" }}
          >
            <Wrap align={"center"} spacing={"20px"}>
              <Text fontSize={{ base: "18px", lg: "20", xl: "24px" }}>
                Log in with
              </Text>
              <Image
                marginTop={"6px"}
                src="/42_Logo.png"
                boxSize={{ base: "30px", lg: "35px", xl: "40px" }}
              />
            </Wrap>
          </Button>
        </Link>
      </Stack>
    );
}
