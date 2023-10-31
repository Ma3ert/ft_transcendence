import { Button, HStack, Icon, Text, useToast } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import {
  AppNavigationContext,
  ChatContext,
  UsersContext,
  ChannelsContext,
} from "@/context/Contexts";
import { PRIVATE } from "@/../contstants";
import UserAvatar from "../UserAvatar";
import { CHANNEL } from "@/../contstants";
import {
  LockIcon,
  ViewOffIcon,
  ViewIcon,
  SettingsIcon,
} from "@chakra-ui/icons";
import { ModalWrapper } from "../Wrappers/ModalWrapper";
import { useRouter } from "next/navigation";
import apiClient from "@/services/requestProcessor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFailure, useSuccess } from "@/hooks/useAlerts";

interface ChannelFieldProps {
  channel: Channel;
}
const ChannelField: React.FC<ChannelFieldProps> = ({ channel }) => {
  const { setCurrentChat } = useContext(ChatContext);
  const { setActiveChannel } = useContext(ChannelsContext);
  const router = useRouter();
  const toast = useToast();
  const success = useSuccess();
  const failure = useFailure();
  const { Channels } = useContext(ChannelsContext);
  const isOwner = Channels!.find((ch) => ch.id === channel.id);
  const joinChannelClient = new apiClient(`chat/channels/${channel!.id}/join/`);
  const queryClient = useQueryClient();
  const joinChannelMutation = useMutation({
    mutationFn: () => joinChannelClient.postData({}).then((res) => res.data),
    onSuccess: (res: any) => {
      toast(success("You joined channel successfully"));
      queryClient.invalidateQueries(["channels"]);
    },
    onError: (err: any) => {
      toast(failure("failed to join channel"));
    },
  });
  const caseActions = new Map([
    [
      "PRIVATE",
      () => {
        return <Icon as={ViewOffIcon} fontSize="sm" />;
      },
    ],
    [
      "PROTECTED",
      () => {
        return <Icon as={LockIcon} fontSize="sm" />;
      },
    ],
    [
      "PUBLIC",
      () => {
        return <Icon as={ViewIcon} fontSize="sm" />;
      },
    ],
  ]);
  return (
    <Button
      variant={"field"}
      w={"100%"}
      h="auto"
      px={2}
      onClick={() => {
        if (isOwner) {
          setCurrentChat!(false);
          setActiveChannel!(channel);
          router.push(`/Chat`);
        }
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
          <Text fontFamily="visbyRound" fontSize="sm">
            {channel.name}
          </Text>
        </HStack>

        <HStack spacing={4}>
          {!isOwner && (
            <Icon
              as={AiOutlineUsergroupAdd}
              onClick={() => {
                joinChannelMutation.mutate();
              }}
              fontSize={"23px"}
              color="#DC585B"
              _hover={{ transform: "scale(1.1)" }}
            />
          )}
          {caseActions.get(channel!.type!) &&
            caseActions.get(channel!.type!)!()}
        </HStack>
      </HStack>
    </Button>
  );
};

export default ChannelField;
