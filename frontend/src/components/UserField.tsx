"use client";
import { Avatar, Button, Wrap, Text, HStack, Icon } from "@chakra-ui/react";
import React , {useContext, useEffect, useState} from "react";
import IconButton from "./IconButton";
import { FaMessage } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";
import UserAvatar from "./UserAvatar";
import { FaEllipsis } from "react-icons/fa6";
import { AppNavigationContext, ChatContext, UsersContext } from "@/context/Contexts";
import { PRIVATE } from "@/../contstants";
interface Props {
  user: User;
}

const UserField: React.FC<Props> = ({ user }) => {

  const {setCurrentSection} = useContext(AppNavigationContext)
  const {setCurrentChat} = useContext(ChatContext)
  const [clicked, setClicked] = useState(false)
  const {setActivePeer} = useContext (UsersContext)

  useEffect (()=>{
    if (clicked)
    {
      setActivePeer!(user)
      setCurrentSection!('chat')
      setCurrentChat!(PRIVATE)
      setClicked(false)
      console.log ('all state is setted')
    }
  }, [clicked])

  return (
    <Button variant={"field"} w={"100%"} h="auto" px={2} onClick={()=>{
      setClicked (true)
}}>
      <HStack w="100%" h="100%" justify="space-between" alignItems="center">
        <HStack
          spacing={5}
          w="100%"
          justify="start"
          alignItems="center"
          px={3}
          py={2}
        >
          <UserAvatar user={user} />
          <Text fontSize="sm">
            {user.username}
          </Text>
        </HStack>

        <Icon as={FaEllipsis} _hover={{transform:'scale(1.1)'}} fontSize="25px" />
      </HStack>
    </Button>
  );
};

export default UserField;
