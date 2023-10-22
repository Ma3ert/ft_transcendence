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
  ChannelsContext,
} from "@/context/Contexts";
import { PRIVATE, loggedIndUser } from "@/../contstants";
import OptionsMenu from "./ChatComponents/FriendSettingsMenu";
import useUserStatus from "@/hooks/useUserStatus";
import UserFieldNav from "./ChatComponents/UserFieldNav";
import { useAuth } from "@/hooks/useAuth";
interface Props {
  user: User;
  member?: Member;
  MembersList?: Member[];
}

const UserField: React.FC<Props> = ({ user, member, MembersList}) => {
 
const {friendsList} = useContext(UsersContext);
  const {currentUser} = useAuth ();
  const { userIsBlocked } = useUserStatus(user);

  useEffect(() => {
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

        <HStack spacing={4}>
          {userIsBlocked ? (
            <Text fontSize='sm' color='#DC585B'>Blocked</Text>
          ) : (
            <UserFieldNav
              member={member!}
              user={user!}
              friendsList={friendsList!}
            />
          )}
          {user.id != currentUser!.id && (
            <OptionsMenu
              member={member!}
              user={user!}
              MembersList={MembersList!}
            />
          )}
        </HStack>
      </HStack>
    </Button>
  );
};

export default UserField;
