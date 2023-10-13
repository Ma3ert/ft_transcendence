import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import {
  AppNavigationContext,
  ChatContext,
  UsersContext,
  ChannelsContext,
} from "@/context/Contexts";
import { PRIVATE } from "@/../contstants";
import UserAvatar from "../UserAvatar";
import { CHANNEL } from "@/../contstants";
import {LockIcon, ViewOffIcon, ViewIcon} from "@chakra-ui/icons"


interface ChannelFieldProps {
  channel: Channel;
}
const ChannelField: React.FC<ChannelFieldProps> = ({ channel }) => {
  const { setCurrentSection } = useContext(AppNavigationContext);
  const { setCurrentChat } = useContext(ChatContext);
  const { setActiveChannel } = useContext(ChannelsContext);
  const caseActions = new Map([
    ['PRIVATE', () => {
      return <Icon as={ViewOffIcon} fontSize='23px' />
    }],
    ['PROTECTED', () => {
        return <Icon as={LockIcon} fontSize='23px' />
    }],
    ['PUBLIC', () => {
        return <Icon as={ViewIcon} fontSize='23px' /> 
    }]
  ]);
  return (
    <Button
      variant={"field"}
      w={"100%"}
      h="auto"
      px={2}
      onClick={() => {
        // setClicked (true)
        setCurrentSection!("chat");
        setCurrentChat!(false);
        setActiveChannel!(channel);
      }}
    >
      <HStack w="100%" h="100%" justify="space-between" alignItems="center">
        <HStack
          spacing={5}
          w="100%"
          justify="start"
          alignItems="center"
          px={3}
          py={2}
        >
          <UserAvatar isChannel={true} channel={channel} />
          <Text fontSize="sm">{channel.name}</Text>
        </HStack>

        <HStack spacing={5}>
            {caseActions.get(channel!.type!)!()}
          <Text fontSize="sm">{channel!.type?.toLowerCase ()}</Text>
        </HStack>
      </HStack>
    </Button>
  );
};

export default ChannelField;
