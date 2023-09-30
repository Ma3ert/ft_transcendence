import React, { useState, useContext } from "react";
import { Avatar, Stack, HStack, Text, Button } from "@chakra-ui/react";
import UserAvatar from "../UserAvatar";
import FilterBox from "./FilterBox";
import { FaUserAlt } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import IconButton from "../IconButton";
import { ChatContext, UsersContext } from "../../context/Contexts";
import { PRIVATE, CHANNEL } from "../../../contstants";
import { NotificationWrapper } from "./NotificationBadge";
interface ChatNavigationProps {}

interface ChannelsNavigationProps {}

const ChannelsNavigation: React.FC<ChatNavigationProps> = ({}) => {
  const { Channels, setActiveChannel, activeChannel, setCurrentChat } =
    useContext(ChatContext);
  return (
    <>
      {Channels?.map((channel, index) => {
        return (
          <NotificationWrapper type='activeChat' status={false} key={index}>
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
  const { Friends, setCurrentChat } =
    useContext(ChatContext);
    const {activePeer, setActivePeer} = useContext(UsersContext)
  return (
    <>
      {Friends?.map((friend, index) => {
        return (
          <NotificationWrapper type='activeChat' status={true} key={index}>
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
  const [privateChat, setPrivate] = useState<boolean>(PRIVATE);
  const { chatType, setCurrentChat } = useContext(ChatContext);
  return (
    <Stack justify={"center"} alignItems={"center"} spacing={2} h={"100%"}>
      <IconButton
        color="#5B6171"
        onClick={() => {
          setPrivate(!privateChat);
          // setCurrentChat!(privateChat ? PRIVATE : CHANNEL)
        }}
        icon={privateChat ? FaUserGroup : FaUserAlt}
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
        {privateChat ? <FriendsNavigation /> : <ChannelsNavigation />}
      </Stack>
    </Stack>
  );
};

export default ChatNavigation;
