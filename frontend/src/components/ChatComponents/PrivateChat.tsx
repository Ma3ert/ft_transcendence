import { Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import ChatNavigation from "./ChatNavigation";
import ChatBox from "./chatBox";
import { ModalWrapper } from "../Wrappers/ModalWrapper";
import NewChannel from "./NewChannel";
import { useState, useEffect, useContext } from "react";
import EventListener from "../../../utils/EventListener";
import DmChatRoom from "./DmChatRoom";
import {
  GlobalContext,
  DmContext,
  ChatContext,
  UsersContext,
} from "@/context/Contexts";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";
import DmProvider from "@/providers/DmProvider";
import NoConversationsPage from "./NoConversationsPage";
import Loading from "../../../app/loading";
import { useAuth } from "@/hooks/useAuth";
interface PrivateChatProps {}

const PrivateChat: React.FC<PrivateChatProps> = () => {
  const { socket } = useContext(GlobalContext);
  const { activePeer } = useContext(UsersContext);
  const directConversationsClient = new apiClient(`/chat/direct/`);
  
  const {
    setActivePeer,
    setFriendsConversations,
    friendsConversations,
    friendsList,
  } = useContext(UsersContext);
  const {messages, setMessages} = useContext (DmContext)
  const {currentUser} = useAuth ()
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["directConversations"],
    queryFn: () => directConversationsClient.getData().then((res) => res.data),
    onSuccess: (data: String[]) => {
      if (data && data.length) {
        const filteredData = friendsList!.filter((friend: User) =>
          data.includes(friend.id)
        );
        if (filteredData.length) {
          setFriendsConversations!(filteredData);
          if (activePeer == null) setActivePeer!(filteredData[0]);
        }
      }
    },
    onError: (error) => {},
  });


  
  if (isLoading) return <Loading />;

  return (
    <Stack
      w="100%"
      h="100%"
      justifyContent={"center"}
      align={"center"}
      spacing={0}
    >
      {activePeer ? (
       <DmChatRoom/>
      ) : (
        <NoConversationsPage />
      )}
    </Stack>
  );
};

export default PrivateChat;
