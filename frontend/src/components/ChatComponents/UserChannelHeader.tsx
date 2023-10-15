import React, { useContext, useEffect } from "react";
import { Avatar, HStack, Text, Stack } from "@chakra-ui/react";
import { ChannelsContext, ChatContext , UsersContext} from "@/context/Contexts";
import { PRIVATE, CHANNEL } from "@/../contstants";
import {useQuery} from "react-query";
import apiClient from "@/services/requestProcessor";
import PeerHeader from "./PeerHeader";
import ChannelHeader from "./ChannelHeader";

interface UserChannelHeaderProps {
  status?: userStatus;
}

const UserChannelHeader: React.FC<UserChannelHeaderProps> = ({ status }) => {
  const { chatType } = useContext(ChatContext);


  useEffect(() => {
    console.log ('chat type ' + chatType)
  }, [])
  return (
    chatType == PRIVATE ? <PeerHeader  /> : <ChannelHeader />
  );
};


export default UserChannelHeader;