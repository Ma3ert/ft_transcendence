"use client";
import { Avatar, Button, Wrap, Text, HStack, Icon } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import IconButton from "./IconButton";
import { FaMessage } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";
import UserAvatar from "./UserAvatar";
import { FaEllipsis } from "react-icons/fa6";
import {
  AppNavigationContext,
  ChatContext,
  UsersContext,
} from "@/context/Contexts";
import { PRIVATE } from "@/../contstants";
import OptionsMenu from "./ChatComponents/FriendSettingsMenu";
interface Props {
  user: User;
  userType?: "Friend" | "User" | "Owner";
}

const UserField: React.FC<Props> = ({ user, userType = 'User' }) => {
  const { setCurrentSection } = useContext(AppNavigationContext);
  const { setCurrentChat } = useContext(ChatContext);
  const { setActivePeer, friendsList } = useContext(UsersContext);

  useEffect(() => {
    console.log("friends :");
    console.table(friendsList);
  }, [friendsList]);

  return (
    <Button variant={"field"} w={"100%"} h="auto" px={2} onClick={() => {}}>
      <HStack w="100%" h="100%" justify="space-between" alignItems="center">
        <HStack
          spacing={5}
          w="100%"
          justify="start"
          alignItems="center"
          px={3}
          py={2}
        >
          <UserAvatar user={user!} />
          <Text fontSize="sm">{user!.username}</Text>
        </HStack>

        <HStack spacing={3}>
          {friendsList!.length &&
            friendsList!.find((friend) => friend.id == user.id) && (
              <Icon
                onClick={() => {
                  setActivePeer!(user);
                  setCurrentSection!("chat");
                  setCurrentChat!(PRIVATE);
                }}
                as={FaMessage}
                fontSize="22px"
                _hover={{ transform: "scale(1.1)" }}
              />
            )}
          {userType == "Owner" ? (
            <Text fontSize="sm">Owner</Text>
          ) : (
            <OptionsMenu
              user={user!}
              type={
                friendsList!.find((friend) => friend.id == user.id)
                  ? "Friend"
                  : "User"
              }
            />
          )}
        </HStack>
      </HStack>
    </Button>
  );
};

export default UserField;
