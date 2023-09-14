"use client";
import Logo from "@/components/Logo";
import { Button, Icon, Stack, Image, Wrap, Text, Box } from "@chakra-ui/react";
import ButtonStack from "@/components/ButtonStack";
import { BsGoogle } from "react-icons/bs";
import Link from "next/link";

export default function Home() {
  return (
    <Stack
      w="100%"
      h="100vh"
      border={"1px"}
      borderColor={{base:'red', sm:'green', md:'blue', lg:'yellow', xl:'white'}}
      justify={"center"}
      alignItems={"center"}
    >
      <Box mt={20}>
        <Link href={"/"}>
          <Logo src="/logo.png" />
        </Link>
      </Box>

      <Stack flex={1} justify={"center"} alignItems={"center"}>
        <Button
          variant={"primary"}
          width="300px"
          height="80px"
          fontSize={"22px"}
        >
          <Wrap align={"center"} spacing={"20px"}>
            <Text fontSize={"24px"}>Log in with</Text>{" "}
            <Image marginTop={"6px"} src="/42_Logo.png" w={"40px"} h={"40px"} />
          </Wrap>
        </Button>
      </Stack>
    </Stack>
  );
}

{
  /* <Stack
    spacing={"300px"}
    direction="column"
    align="center"
    justify="center"
    minH="70vh"
    >
    <Link href={"/ChangeUserName"}>
      
    </Link>
  </Stack> */
}
