import { Grid, GridItem, Stack, Text } from "@chakra-ui/react";
interface ChannelsChatProps {}
import ChatBox from "../ChatComponents/chatBox";
import ChatNavigation from "../ChatComponents/ChatNavigation";
import ChannelSettings from "../ChatComponents/ChannelSettings";
import useChannelManager from "@/hooks/useChannelManager";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";
import { useState, useContext } from "react";
import { ChannelsContext, GlobalContext, UsersContext, DmContext } from "@/context/Contexts";
import { getUserRole } from "../../../utils/helpers";
import {useEffect} from "react"
import EventListener from "../../../utils/EventListener";

const ChannelsChat: React.FC<ChannelsChatProps> = ({}) => {

    const channelMembersClient = (channelId: string) =>
    new apiClient(`/chat/channels/${channelId}/members`);
    const [channelMembers, setChannelMembers] = useState<Member[]>([]);
    const { activeChannel } = useContext(ChannelsContext);
    const channelMessagesClient = new apiClient (`/chat/channels/${activeChannel!.id}/messages/?skip=0&take=3`)
    const {loggedInUser} = useContext (UsersContext)
    const [loggedInUserRole, setLoggedInUserRole] = useState<string>("");
    const [channelMessages, setChannelMessages] = useState<DirectMessage[]>([]);
    const {socket} = useContext (GlobalContext)
  
  // eslint-disable-next-line react/jsx-key
  

  useQuery ({
    queryKey: ["channelMessages", activeChannel?.id],
    queryFn: async () =>
    channelMessagesClient.getData ()
    .then (res => res.data),
    onSuccess: (data: any) => {
      setChannelMessages (data)
      console.log (`channel messages query`)
      console.table (data)
    }, 
    onError : (err) => {
      console.log (err)
      }
  })

  useQuery({
    queryKey: ["channelMembers", activeChannel?.id],
    queryFn: async () =>
      channelMembersClient(activeChannel!.id!)
        .getData()
        .then((res) => res.data),
    onSuccess: (data: any) => {
      setChannelMembers(data);
      setLoggedInUserRole(getUserRole (loggedInUser!, data))
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect (()=>{
    console.log ('in channel chat --------')

    socket!.on ('CM', (data:any)=>{console.table (data)})
    // EventListener (socket!, "CM", (data)=>{
    //   const channelMsgs = Array.from (channelMessages)
    //   channelMsgs!.push (data)
    //   setChannelMessages (channelMsgs!)
    //   console.log (`channel message data }`)
    //   console.table (data)
    //   })
  }, [channelMessages])
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
        <DmContext.Provider value={{messages: channelMessages }}>
          <ChatBox />
        </DmContext.Provider>
      </GridItem>
      <GridItem justifyContent="center" alignItems="center" w={"100%"} h="100%">
          <ChannelSettings members={channelMembers} userRole={loggedInUserRole} channel={activeChannel!}/>        
      </GridItem>
    </Grid>
  );
};

export default ChannelsChat;
