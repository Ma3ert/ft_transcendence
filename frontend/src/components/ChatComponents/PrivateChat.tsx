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
interface PrivateChatProps {}

const PrivateChat: React.FC<PrivateChatProps> = () => {

  const {socket} = useContext (GlobalContext)
  const  {activePeer} = useContext (UsersContext)
  const dmClient = new apiClient (`chat/direct/${activePeer!.id}/messages?skip=0&take=5`)
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>([])

  useQuery ({
    queryKey: ["directMessages", activePeer!.id],
    queryFn:()=> dmClient.getData ().then (res=>res.data),
    onSuccess: (data)=>{
      console.log (`direct message query`)
      console.table (data)
      // setDirectMessages (data)
    }
  })
  useEffect (()=>{
    EventListener (socket!, "DM", (data)=>{
      const dms = Array.from (directMessages)
      dms!.push (data)
      setDirectMessages (dms!)
      console.log (`direct message data }`)
      console.table (data)
      })
  }, [directMessages])
  return (
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
        <DmContext.Provider value={{messages:directMessages}}>
        <ChatBox />
        </DmContext.Provider>
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
  );
};


export default PrivateChat