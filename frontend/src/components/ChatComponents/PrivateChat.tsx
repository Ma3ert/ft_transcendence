import { Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import ChatNavigation from "./ChatNavigation";
import ChatBox from "./chatBox";
import { ModalWrapper } from "../Wrappers/ModalWrapper";
import NewChannel from "./NewChannel";
import {useState, useEffect, useContext } from "react";
import EventListener from "../../../utils/EventListener";
import { GlobalContext, DmContext, ChatContext, UsersContext } from "@/context/Contexts";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";
import DmProvider from "@/providers/DmProvider";
interface PrivateChatProps {}

const PrivateChat: React.FC<PrivateChatProps> = () => {

  const {socket} = useContext (GlobalContext)
  const  {activePeer, setActivePeer,friendsConversations, setFriendsConversations, friendsList} = useContext (UsersContext)
  
  const friendsConversationsClient = new apiClient (`chat/direct/`)


  useQuery ({
    queryKey: "friendsConversations",
    queryFn: () => friendsConversationsClient.getData ().then (res=>res.data),
    onSuccess: (conversationIds:string[]) => {
      if (conversationIds && conversationIds.length > 0)
      {
        const filterdArray = friendsList!.filter((friend) => {
          if ((friend!.id && conversationIds?.includes(friend!.id))
          )
            return true;
          return false;
        });
        setFriendsConversations!(filterdArray);
        setActivePeer!(filterdArray[0]);
      }
  },
    onError: (err)=>console.log (err)
  })
 
  
  return (
   <Stack w='100%' h='100%' justifyContent={'center'} align={'center'} spacing={0}>
    {
      (activePeer && friendsConversations!.length > 0) ? (
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
        <GridItem justifyContent="center" alignItems="center" w={"100%"} h="100%">
          <DmProvider>
            <ChatBox />
          </DmProvider>
        </GridItem>
        <GridItem justifyContent="center" alignItems="center" w={"100%"} h="100%">
          <Stack justify={"end"} alignItems={"center"} w="100%" h="90%">
            <ModalWrapper
              type="regular"
              buttonVariant="largeSecondary"
              buttonValue={<Text>Create channel</Text>}
            >
              <NewChannel />
            </ModalWrapper>
          </Stack>
        </GridItem>
      </Grid>
      ) : (
        <Text>no active peer</Text>
      )
    }
   </Stack>
  );
};


export default PrivateChat