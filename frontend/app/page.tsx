"use client";
import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import LoginPage from "@/components/Sections/LoginPage";
import { GlobalContext } from "@/context/Contexts";
import UsersProvider from "@/providers/UsersProvider";
import ChatProvider from "@/providers/ChatProvider";
import { useEffect } from "react";
import io from "socket.io-client";
import ChannelsProvider from "@/providers/ChannelsProvider";
import Cookies from "js-cookie";

export default function Home() {
  return (
    <>
      <LoginPage />
    </>
  );
}
