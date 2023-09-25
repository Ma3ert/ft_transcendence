import React, { useState, useContext } from "react";
import { Avatar, Stack, HStack, Text, Button } from "@chakra-ui/react";
import UserAvatar from "../UserAvatar";
import FilterBox from "./FilterBox";
import { FaUserAlt } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import IconButton from "../IconButton";
import { ChatContext } from "../../context/Contexts";
import { PRIVATE, CHANNEL } from "../../../contstants";
interface ChatNavigationProps {}

interface ChannelsNavigationProps {}

const ChannelsNavigation: React.FC<ChatNavigationProps> = ({}) => {
  const { Channels, setActiveChannel, activeChannel, setChatType } = useContext(ChatContext);
  return (
    <>
      {Channels?.map((channel, index) => {
        return <UserAvatar isChannel={true} channel={channel} key={index} action={()=> {
          setChatType!(CHANNEL)
          setActiveChannel! (channel)
        }} active={activeChannel!.id == channel.id} />;
      })}
    </>
  );
};

const FriendsNavigation: React.FC<ChatNavigationProps> = ({}) => {
  const { Friends, setActivePeer, activePeer , setChatType} = useContext(ChatContext);
  return (
    <>
      {Friends?.map((friend, index) => {
        return <UserAvatar isChannel={false} user={friend} key={index} action={() =>{
          setChatType!(PRIVATE)
          setActivePeer!(friend)
        }}  active={activePeer?.id == friend.id}/>;
      })}
    </>
  );
};

const ChatNavigation: React.FC<ChatNavigationProps> = ({}) => {
  const [privateChat, setPrivate] = useState<boolean>(PRIVATE);
  const { chatType } = useContext(ChatContext);
  return (
    <Stack justify={"center"} alignItems={"center"} spacing={2} h={"100%"}>
      <IconButton
        color="#5B6171"
        onClick={() => setPrivate(!privateChat)}
        icon={privateChat ? FaUserGroup : FaUserAlt}
        size={"25px"}
      />
      <Stack
        w="auto"
        borderRadius={"2xl"}
        h='100%'
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
