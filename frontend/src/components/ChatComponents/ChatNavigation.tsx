import React, { useState, useContext, useEffect } from "react";
import { Avatar, Stack, HStack, Text, Button, Tooltip, useClipboard } from "@chakra-ui/react";
import UserAvatar from "../UserAvatar";
import FilterBox from "./FilterBox";
import { FaUserAlt } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import IconButton from "../IconButton";
import { useQuery } from "react-query";
import {
  ChannelsContext,
  ChatContext,
  DmContext,
  GlobalContext,
  UsersContext,
} from "../../context/Contexts";
import { PRIVATE, CHANNEL } from "../../../contstants";
import { NotificationWrapper } from "./NotificationBadge";
import { setSyntheticTrailingComments } from "typescript";
import { useToast } from "@chakra-ui/react";
import "../../theme/styles.css";
import { useAuth } from "@/hooks/useAuth";
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
  const {messages, setMessages} = useContext (DmContext)
  const {socket}= useContext (GlobalContext)
  const {currentUser} = useAuth ()
  const toast = useToast();
  const {
    friendsConversations,
    activePeer,
    setFriendsConversations,
    friendsList,
    setActivePeer,
  } = useContext(UsersContext);
  const notification = (friend: User) =>
    DmNotifications?.find((elm) => elm == friend.id);
  const countOccurrences = (friendid: string, ids: string[]) => {
    return ids.filter((item) => item === friendid).length;
  };

  return (
    <>
      {activePeer && friendsConversations?.length == 0 ? (
        <NotificationWrapper status={notification(activePeer!) ? true : false}>
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
          ////console.log(`friend ${friend.username}  notifications`);
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
  const {Channels} = useContext (ChannelsContext)

  return (
    <Stack justify={"center"} alignItems={"center"} spacing={2} h={"100%"}>
      <IconButton
        onClick={() => {
          if (Channels && Channels?.length)
            setCurrentChat!(!chatType);
        }}
        icon={chatType ? FaUserGroup : FaUserAlt}
        size={"25px"}
      />
      <Stack
        className="customScroll"
        w="auto"
        overflowY={"auto"}
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
