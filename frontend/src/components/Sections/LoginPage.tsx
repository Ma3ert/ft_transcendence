"use client";
import Logo from "@/components/Logo";
import { Button, Icon, Stack, Image, Wrap, Text } from "@chakra-ui/react";
import ButtonStack from "@/components/ButtonStack";
import { BsGoogle } from "react-icons/bs";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context/Contexts";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/services/requestProcessor";
import { PinInput, PinInputField } from "@chakra-ui/react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

const client = new apiClient("/auth/twoFactor")

export default function LoginPage() {
  const [pin, setPin] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter();
  const {currentUser, updateUser} = useAuth()
  console.log("current user from the lobby: ", currentUser)
  if (currentUser && currentUser.twoFactor && !currentUser.pinValidated)
  {
    client.getData("").then(() => (onOpen()))
  }
  if (currentUser && currentUser.activated && !currentUser.twoFactor)
  {
    console.log("------------------------------------------------------------------------------------------------------")
    router.push("/Lobby")
  }
  if (pin.length === 6)
    client.postData({"pin": pin} ,"").then(() => router.push("/Lobby"))
  const handleInput = (newPin: string) => {
    setPin(newPin)
  }
  return (
    <Stack
    spacing={"20vh"}
    direction="column"
    align="center"
    justify="center"
    minH="70vh"
    >
      <Modal closeOnOverlayClick={false} variant={"form"} isOpen={isOpen} onClose={onClose} size={"invite"}>
        <ModalOverlay />
        <ModalContent style={{ width: "480px", height: "280px" }}>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Stack align={"center"} spacing={"40px"} fontFamily={"visbyRound"}>
              <Text color={"#5B6171"} fontSize={"20px"}>Enter the PIN</Text>
              <Wrap spacing={"15px"} align={"center"} px={"auto"}>
                  <PinInput focusBorderColor="#d9d9d9" onChange={handleInput} >
                  <PinInputField
                      borderRadius={"10px"}
                      boxSize={"50px"}
                      border={"0px"}
                      bg={"#1D222C"}
                      color={"#5B6171"}
                      />
                  <PinInputField
                      borderRadius={"10px"}
                      boxSize={"50px"}
                      border={"0px"}
                      bg={"#1D222C"}
                      color={"#5B6171"}
                      />
                  <PinInputField
                      borderRadius={"10px"}
                      boxSize={"50px"}
                      border={"0px"}
                      bg={"#1D222C"}
                      color={"#5B6171"}
                      />
                  <PinInputField
                      borderRadius={"10px"}
                      boxSize={"50px"}
                      border={"0px"}
                      bg={"#1D222C"}
                      color={"#5B6171"}
                      />
                  <PinInputField
                      borderRadius={"10px"}
                      boxSize={"50px"}
                      border={"0px"}
                      bg={"#1D222C"}
                      color={"#5B6171"}
                    />
                  <PinInputField
                      borderRadius={"10px"}
                      boxSize={"50px"}
                      border={"0px"}
                      bg={"#1D222C"}
                      color={"#5B6171"}
                      />
                  </PinInput>
              </Wrap>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Logo src="/logo.png" width="334px" height="179px"></Logo>
      <Link href={"http://localhost:3000/auth/42/login"}>
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
  );
}
