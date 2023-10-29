import { Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import ChatNavigation from "./ChatNavigation";
import ChatBox from "./chatBox";
import { ModalWrapper } from "../Wrappers/ModalWrapper";
import NewChannel from "./NewChannel";
import { useState, useEffect, useContext } from "react";
import EventListener from "../../../utils/EventListener";
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
  useEffect(() => {}, [friendsConversations]);
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
        <Grid
          templateColumns={{ sm: "10% 80%", lg: "20% 60% 20%" }}
          w={{ base: "100%", lg: "100%", xl: "90%", vl: "85%" }}
          // border="1px"
          // borderColor="green"
          h="100%"
          mx="auto"
          justifyContent="space-between"
          alignItems="center"
        >
          <GridItem justifyContent="center" alignItems="center" h="100%">
            <ChatNavigation />
          </GridItem>
          <GridItem
            justifyContent="center"
            alignItems="center"
            w={"100%"}
            h="100%"
          >
            <DmProvider>
              <ChatBox />
            </DmProvider>
          </GridItem>
          <GridItem
            justifyContent="center"
            alignItems="center"
            w={"100%"}
            h="100%"
          >
            <Stack justify={"end"} alignItems={"center"} w="100%" h="90%">
              <ModalWrapper
                type="regular"
                buttonVariant="largeSecondary"
                buttonValue={
                  <Text fontFamily="visbyRound">Create channel</Text>
                }
              >
                <NewChannel />
              </ModalWrapper>
            </Stack>
          </GridItem>
        </Grid>
      ) : (
        <NoConversationsPage />
      )}
    </Stack>
  );
};

export default PrivateChat;
