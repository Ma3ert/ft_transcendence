"use client";
import {
  Box,
  Stack,
  Avatar,
  Button,
  Input,
  Wrap,
  Text,
  Icon,
  Flex,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ScrollableStack from "./ScrollableStack";
import InputStack from "./InputStack";
import { FaPen } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/services/requestProcessor";
import { useQueryClient } from "react-query";
import { useUpdateCurrentUser } from "@/hooks/useUpdateCurrentUser";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import CostumSwitcher from "./ChatComponents/CostumSwitcher";
import {z} from 'zod'

type Props = {};

const client = new apiClient("/users");
const inputScheme  = z.string ().min (4).max (14)
const UserSetting = (props: Props) => {
  const { currentUser, updateUser } = useAuth();
  const toast = useToast();
  const [faState, faStateSetter] = useState(currentUser.user.twoFactor);
  const [newAvatar, setNewAvatar] = useState(currentUser.user.avatar);
  const [inputValue, setInputValue] = useState("");

  const handlePreview = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentFiles = event.target.files;
    if (currentFiles && currentFiles?.length > 0) {
      let src: string = URL.createObjectURL(currentFiles[0]);
      setNewAvatar(src);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation =  inputScheme.safeParse (inputValue)
    if (!validation.success)
    {
      !toast.isActive("edit") &&
        toast({
          id: "edit",
          title: "Unvalid Input",
          status: "error",
        });
      return ;
    }
    const formData = new FormData(event.target as HTMLFormElement);
    const userName: string = formData.get("username") as string;
    const imageFile = (document.getElementById("avatar") as HTMLInputElement)
      .files?.[0];
    if (inputValue !== "" || imageFile) {
      client.patchData(formData).then(() => {
        updateUser && updateUser();
        !toast.isActive("edit") &&
          toast({
            id: "edit",
            title: "Changed successfully",
            status: "success",
          });
        setInputValue("");
      })
      .catch(() => {
        !toast.isActive("edit") &&
        toast({
          id: "edit",
          title: "Unvalid Input",
          status: "error",
        });
        setInputValue("");
      });
    }
  };

  const activateFa = () => {
    const patchClient = new apiClient("/auth/twoFactor");
    var toSend = { activate: faState ? false : true };
    patchClient.patchData(toSend, "").then((res: AxiosResponse) => {
      ////console.log("res data: ", res.data);
      faStateSetter(res.data.twoFactor);
      updateUser && updateUser();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        justifyContent={"center"}
        w={"100%"}
        h={"50vh"}
        bg={"#1D222C"}
        px={{ base: "25px", md: "45px" }}
        borderRadius={"20px"}
      >
        <Stack spacing={{ base: "20px", md: "25px" }} align={"center"}>
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
              boxSize={{ base: "80px", md: "100px", xl: "137px" }}
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
          <Input
            variant={"secondary"}
            w={"full"}
            id="username"
            name="username"
            h={{ base: "40px", md: "50px" }}
            placeholder={currentUser && currentUser.user.username}
            onChange={(e) => {setInputValue(e.target.value)}}
            value={inputValue}
          ></Input>
          <Flex w={"full"} px={"10px"}>
            <Text fontFamily={"visbyRound"} fontSize={"15px"} color={"#fff"}>
              Enable 2FA
            </Text>
            <Spacer />
            <CostumSwitcher state={faState!} onClick={activateFa} />
          </Flex>
          <Button
            type="submit"
            variant={"secondary"}
            width={{ base: "100px", md: "140px" }}
            height={{ base: "40px", md: "50px" }}
            fontSize={{ base: "12px", md: "15px" }}
          >
            Confirm
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default UserSetting;
