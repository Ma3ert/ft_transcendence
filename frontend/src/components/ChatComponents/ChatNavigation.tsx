import React, { useState, useContext, useEffect } from "react";
import { Avatar, Stack, HStack, Text, Button, Tooltip } from "@chakra-ui/react";
import UserAvatar from "../UserAvatar";
import FilterBox from "./FilterBox";
import { FaUserAlt } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import IconButton from "../IconButton";
import { useQuery } from "react-query";
import {
  ChannelsContext,
  ChatContext,
  UsersContext,
} from "../../context/Contexts";
import { PRIVATE, CHANNEL } from "../../../contstants";
import { NotificationWrapper } from "./NotificationBadge";
import { setSyntheticTrailingComments } from "typescript";
import { useToast } from "@chakra-ui/react";
interface ChatNavigationProps {}

interface ChannelsNavigationProps {}

const ChannelsNavigation: React.FC<ChatNavigationProps> = ({}) => {
  const { setCurrentChat, CmNotifications } = useContext(ChatContext);
  
  const { activeChannel, setActiveChannel, Channels } =
    useContext(ChannelsContext);
  const notification = (channel: Channel) =>
    CmNotifications?.find((elm) => elm == channel.id);
  function countOccurrences(channelid: string, ids: string[]) {
    return ids.filter((item) => item === channelid).length;
  }

  useEffect(() => {}, []);
  return (
    <>
      {Channels?.map((channel, index) => {
        console.log(
          `channel ${channel.name} has ${countOccurrences(
            channel!.id!,
            CmNotifications!
          )} notifications`
        );
        return (
          <NotificationWrapper
            status={notification(channel) ? true : false}
            key={index}
          >
            <UserAvatar
              isChannel={true}
              channel={channel}
              action={() => {
                setCurrentChat!(CHANNEL);
                setActiveChannel!(channel);
              }}
              active={activeChannel!.id == channel.id}
            />
          </NotificationWrapper>
        );
      })}
    </>
  );
};

const FriendsNavigation: React.FC<ChatNavigationProps> = ({}) => {
  const { setCurrentChat, DmNotifications } = useContext(ChatContext);
  const toast = useToast ()
  const { friendsConversations, activePeer, setFriendsConversations, friendsList, setActivePeer } =
    useContext(UsersContext);
  const notification = (friend: User) =>
    DmNotifications?.find((elm) => elm == friend.id);
  const countOccurrences = (friendid: string, ids: string[]) => {
    return ids.filter((item) => item === friendid).length;
  };
  
  
  return (
    <>
      {activePeer && friendsConversations?.length == 0 ? (
       
          <NotificationWrapper
            status={notification(activePeer!) ? true : false}
          >
            <UserAvatar
              isChannel={false}
              user={activePeer!}
              action={() => {
                setCurrentChat!(PRIVATE);
                setActivePeer!(activePeer);
              }}
            />
          </NotificationWrapper>
      ) : (
        friendsConversations?.map((friend, index) => {
          console.log(`friend ${friend.username}  notifications`);
          return (
            <NotificationWrapper
              key={index}

              status={notification(friend!) ? true : false}
            >
             
                <UserAvatar
                  isChannel={false}
                  user={friend}
                  action={() => {
                    setCurrentChat!(PRIVATE);
                    setActivePeer!(friend);
                  }}
                />
            </NotificationWrapper>
          );
        })
      )}
    </>
  );
};

const ChatNavigation: React.FC<ChatNavigationProps> = ({}) => {
  const { chatType, setCurrentChat } = useContext(ChatContext);

  return (
    <Stack justify={"center"} alignItems={"center"} spacing={2} h={"100%"}>
      <IconButton
        onClick={() => {
          setCurrentChat!(!chatType);
        }}
        icon={chatType ? FaUserGroup : FaUserAlt}
        size={"25px"}
      />
      <Stack
        w="auto"
        borderRadius={"2xl"}
        h="100%"
        p={4}
        bg={"#1D222C"}
        spacing={2}
        maxH={"60vh"}
      >
        {chatType ? <FriendsNavigation /> : <ChannelsNavigation />}
      </Stack>
    </Stack>
  );
};

export default ChatNavigation;
