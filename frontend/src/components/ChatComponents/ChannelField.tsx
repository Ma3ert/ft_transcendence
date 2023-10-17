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
import {LockIcon, ViewOffIcon, ViewIcon, SettingsIcon} from "@chakra-ui/icons"
import { ModalWrapper } from "../Wrappers/ModalWrapper";
import { useRouter } from "next/navigation";

interface ChannelFieldProps {
  channel: Channel;
}
const ChannelField: React.FC<ChannelFieldProps> = ({ channel }) => {
  const { setCurrentChat } = useContext(ChatContext);
  const { setActiveChannel } = useContext(ChannelsContext);
  const router = useRouter();
  const caseActions = new Map([
    ['PRIVATE', () => {
      return <Icon as={ViewOffIcon} fontSize='sm' />
    }],
    ['PROTECTED', () => {
        return <Icon as={LockIcon} fontSize='sm' />
    }],
    ['PUBLIC', () => {
        return <Icon as={ViewIcon} fontSize='sm' /> 
    }]
  ]);
  return (
    <Button
      variant={"field"}
      w={"100%"}
      h="auto"
      px={2}
      onClick={() => {
        setCurrentChat!(false);
        setActiveChannel!(channel);
        router.push(`/Chat`);
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

       {caseActions.get(channel!.type!) && caseActions.get(channel!.type!)!()}
      </HStack>
    </Button>
  );
};

export default ChannelField;
