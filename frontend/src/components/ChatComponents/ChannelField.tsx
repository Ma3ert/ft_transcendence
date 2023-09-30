import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { AppNavigationContext, ChatContext, UsersContext } from "@/context/Contexts";
import { PRIVATE } from "@/../contstants";
import UserAvatar from "../UserAvatar";


interface ChannelFieldProps {
    channel: Channel
}
const ChannelField:React.FC<ChannelFieldProps> = ({channel}) => {

    return (<Button variant={"field"} w={"100%"} h="auto" px={2} onClick={()=>{
        // setClicked (true)
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
            <UserAvatar channel={channel} />
            <Text fontSize="sm">
              {channel.name}
            </Text>
          </HStack>
  
          <Icon as={FaEllipsis} _hover={{transform:'scale(1.1)'}} fontSize="25px" />
        </HStack>
      </Button>
      )
}

export default ChannelField;