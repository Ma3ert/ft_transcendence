"use client";
import {
  Avatar,
  Button,
  Input,
  Stack,
  Wrap,
  Box,
  Icon,
  useToast,
} from "@chakra-ui/react";
import Logo from "@/components/Logo";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import apiClient from "@/services/requestProcessor";
import { AxiosResponse } from "axios";
import { FaPen } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useUpdateCurrentUser } from "@/hooks/useUpdateCurrentUser";
import Cookies from "js-cookie";
import { useQuery, useQueryClient } from "react-query";

import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Text,
} from "@chakra-ui/react";
import { Cookie } from "next/font/google";

export default function Home() {
  const toast = useToast();
  const [pin, setPin] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const client = new apiClient("/users");
  const twoFaClient = new apiClient("/auth/twoFactor");
  const { currentUser, updateUser } = useAuth();
  //console.log("current User: ", currentUser);
  const [newAvatar, setNewAvatar] = useState(
    currentUser ? currentUser.user.avatar : ""
  );
  // const [retry, setRetry] = useState(5 - currentUser.user.twoFactorRetry);
  const [value, setValue] = useState("");
  const first = useRef<any>(null);

  useEffect(() => {
    if (pin.length === 6 && 5 - currentUser.user.twoFactorRetry) {
      twoFaClient
        .postData({ pin: pin }, "")
        .then((res) => {
          //console.log("result: from pin validation: ", res);
          router.push("/Lobby");
        })
        .catch((err) => {
          setPin("");
          setValue("");
          updateUser && updateUser();
          // setRetry(5 - currentUser.user.twoFactorRetry)
          first.current && first.current.focus();
        });
    }
  }, [pin]);

  useEffect(() => {
    if (
      currentUser &&
      currentUser.user.twoFactor &&
      !currentUser.user.pinValidated
    ) {
      //console.log("I sent it again");
      twoFaClient.getData("").then(() => onOpen());
    }
  }, []);

  if (
    currentUser &&
    currentUser.user.activated &&
    !currentUser.user.twoFactor &&
    !currentUser.user.pinValidated
  )
    router.push("/Lobby");

  const handleSkip = () => {
    const formData = new FormData();
    formData.append("activated", "true");
    client.patchData(formData).then(() => {
      router.push("/Lobby");
    });
  };

  const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentFiles = event.target.files;
    if (currentFiles && currentFiles?.length > 0) {
      let src: string = URL.createObjectURL(currentFiles[0]);
      setNewAvatar(src);
    }
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const userName: string = formData.get("username") as string;
    const imageFile = (document.getElementById("avatar") as HTMLInputElement)
      .files?.[0];
    formData.append("activated", "true");
    if (userName !== "" || imageFile) {
      client.patchData(formData).then(() => {
        updateUser && updateUser();
      });
    } else {
      handleSkip();
    }
  };

  return (
    <Stack
      spacing={"20vh"}
      direction="column"
      align="center"
      justify="center"
      minH="70vh"
    >
      <Modal
        closeOnOverlayClick={false}
        variant={"form"}
        isOpen={isOpen}
        onClose={onClose}
        size={"invite"}
      >
        <ModalOverlay />
        <ModalContent style={{ width: "480px", height: "280px" }}>
          <ModalBody>
            <Stack align={"center"} spacing={"40px"} fontFamily={"visbyRound"}>
              <Text color={"#5B6171"} fontSize={"20px"}>
                Enter the PIN
              </Text>
              <Wrap spacing={"15px"} align={"center"} px={"auto"}>
                <PinInput
                  value={value}
                  focusBorderColor="#d9d9d9"
                  onChange={(newPin) => {
                    setPin(newPin);
                    setValue(newPin);
                  }}
                >
                  <PinInputField
                    autoFocus={true}
                    ref={first}
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
              <Text fontSize={"15px"} color={"#5B6171"}>
                {"you still have " +
                  (5 - currentUser.user.twoFactorRetry).toString() +
                  " retry"}
              </Text>
              {!(5 - currentUser.user.twoFactorRetry) &&
                !toast.isActive("toast") &&
                toast({
                  id: "toast",
                  title:
                    "you exceeded the limit of retries contact admin (they won't answer btw)",
                  status: "error",
                  isClosable: false,
                }) && <Text fontSize={"15px"} color={"#DC585B"}></Text>}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
      {currentUser && !currentUser.user.twoFactor && (
        <>
          <Logo src="/logo.png" width="334px" height="179px"></Logo>
          <form onSubmit={handleOnSubmit}>
            <Stack align={"center"} spacing={"40px"}>
              <Stack align={"center"} spacing={{ base: "10px", lg: "20px" }}>
                <Input
                  onChange={handlePreview}
                  visibility={"hidden"}
                  w={0}
                  h={0}
                  type="file"
                  id="avatar"
                  name="avatar"
                />
                <Wrap align={"end"} position={"relative"}>
                  <Avatar
                    zIndex={0}
                    boxSize={{ base: "100px", xl: "137px" }}
                    src={newAvatar}
                  ></Avatar>
                  <Box
                    as="label"
                    htmlFor="avatar"
                    zIndex={1}
                    boxSize={"30px"}
                    borderRadius={"full"}
                    bg={"#DC585B"}
                    color={"#fff"}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    position={"absolute"}
                    left={"70%"}
                  >
                    <Icon as={FaPen} style={{ fontSize: "14px" }} />
                  </Box>
                </Wrap>
              </Stack>
              <Stack align={"center"} spacing={{ base: "10px", lg: "20px" }}>
                <Input
                  id="username"
                  name="username"
                  variant={"default"}
                  w={{ base: "280px", lg: "340px" }}
                  h={{ base: "50px", lg: "66px" }}
                  placeholder={
                    currentUser ? currentUser.user.username : "new username"
                  }
                />
                <Stack align={"center"} spacing={{ base: "6px", lg: "8px" }}>
                  <Button
                    fontSize={{ base: "15px", lg: "20px" }}
                    variant={"ghost"}
                    type="submit"
                  >
                    Apply Changes
                  </Button>
                  <Button
                    fontSize={{ base: "15px", lg: "20px" }}
                    variant={"ghost"}
                    onClick={handleSkip}
                  >
                    skip
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </>
      )}
    </Stack>
  );
}
