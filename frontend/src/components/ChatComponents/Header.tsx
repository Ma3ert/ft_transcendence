"use client";
import { HStack, Text, transition } from "@chakra-ui/react";
import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import { Icon } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import UserStatus from "../../components/UserStatus";
import UserAvatar from "../../components/UserAvatar";
import IconButton from "../../components/IconButton";
import { useContext } from "react";
import { GlobalContext, UsersContext } from "@/context/Contexts";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const { socket } = useContext(GlobalContext);
  const { currentUser, updateUser } = useAuth();

  const handleLogout = () => {
    router.push("http://e1r9p3.1337.ma:3000/auth/42/logout");
    socket.emit("userLoggedOut");
  };

  return (
    <header>
      <HStack
        justify={"space-between"}
        p={4}
        mx={"auto"}
        w={{ sm: "98%", lg: "95%", xl: "90%", vl: "66%" }}
      >
        <Logo src="/logo.png" />

        <HStack justify="center" alignItems="center" spacing={12} maxW={"6xl"}>
          <UserStatus username={currentUser.user.username} status={true} />
          <UserAvatar user={currentUser.user} />
          <IconButton
            icon={FaSignOutAlt}
            size="40px"
            aria-label="Sign out"
            onClick={handleLogout}
          />
        </HStack>
      </HStack>
    </header>
  );
}
