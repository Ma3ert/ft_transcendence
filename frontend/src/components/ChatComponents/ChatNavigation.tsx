import React, { useState, useContext, useEffect } from "react";
import { Avatar, Stack, HStack, Text, Button } from "@chakra-ui/react";
import UserAvatar from "../UserAvatar";
import FilterBox from "./FilterBox";
import { FaUserAlt } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import IconButton from "../IconButton";
import {
  ChannelsContext,
  ChatContext,
  UsersContext,
} from "../../context/Contexts";
import { PRIVATE, CHANNEL } from "../../../contstants";
import { NotificationWrapper } from "./NotificationBadge";
import { setSyntheticTrailingComments } from "typescript";
interface ChatNavigationProps {}

interface ChannelsNavigationProps {}

const ChannelsNavigation: React.FC<ChatNavigationProps> = ({}) => {
  const { setCurrentChat } = useContext(ChatContext);
  const { activeChannel, setActiveChannel, Channels } =
    useContext(ChannelsContext);
  const { channelConversations } = useContext(ChatContext);
  const [conversations, setConversations] = useState<Channel[]>([]);

  useEffect(() => {
    const filterdArray = Channels!.filter((channel) => {
      if (
        channel.id == activeChannel?.id ||
        (channel!.id && channelConversations?.includes(channel!.id))
      )
        return true;
      return false;
    });
    setConversations (filterdArray)
  }, [channelConversations]);
  return (
    <>
      {conversations?.map((channel, index) => {
        return (
          <NotificationWrapper type="activeChat" status={false} key={index}>
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
  const { setCurrentChat } = useContext(ChatContext);
  const { friendsList } = useContext(UsersContext);
  const { activePeer, setActivePeer } = useContext(UsersContext);
  const [conversations, setConversations] = useState<User[]>([]);
  const {privateConversations, setPrivateConversations} = useContext(ChatContext)

  useEffect (() => {
    const filterdArray = friendsList!.filter((friend) => {
      if (
        friend.id == activePeer?.id ||
        (friend!.id && privateConversations?.includes(friend!.id))
      )
        return true;
      return false;
    });
    setConversations(filterdArray)
  }, [privateConversations])
  return (
    <>
      {conversations?.map((friend, index) => {
        return (
          <NotificationWrapper type="activeChat" status={true} key={index}>
            <UserAvatar
              isChannel={false}
              user={friend}
              action={() => {
                setCurrentChat!(PRIVATE);
                setActivePeer!(friend);
              }}
              active={activePeer?.id == friend.id}
            />
          </NotificationWrapper>
        );
      })}
    </>
  );
};

const ChatNavigation: React.FC<ChatNavigationProps> = ({}) => {
  const { chatType, setCurrentChat } = useContext(ChatContext);

  
  return (
    <Stack justify={"center"} alignItems={"center"} spacing={2} h={"100%"}>
      <IconButton
        color="#5B6171"
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
