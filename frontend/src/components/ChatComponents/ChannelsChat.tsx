import { Grid, GridItem, Stack, Text } from "@chakra-ui/react";
interface ChannelsChatProps {}
import ChatBox from "../ChatComponents/chatBox";
import ChatNavigation from "../ChatComponents/ChatNavigation";
import ChannelSettings from "../ChatComponents/ChannelSettings";
import useChannelManager from "@/hooks/useChannelManager";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";
import { useState, useContext } from "react";
import { ChannelsContext, UsersContext } from "@/context/Contexts";
import { getUserRole } from "../../../utils/helpers";

const ChannelsChat: React.FC<ChannelsChatProps> = ({}) => {
    const channelMembersClient = (channelId: string) =>
    new apiClient(`/chat/channels/${channelId}/members`);
    const [channelMembers, setChannelMembers] = useState<Member[]>([]);
    const { activeChannel } = useContext(ChannelsContext);
    const channelClient = new apiClient (`/chat/channels/${activeChannel?.id}`)
    const {loggedInUser} = useContext (UsersContext)
    const [loggedInUserRole, setLoggedInUserRole] = useState<string>("");
  
  // eslint-disable-next-line react/jsx-key
  

  // useQuery ({
    // queryKey: ["channel", activeChannel?.id],
    // queryFn: async () =>
    // channelClient.getData ()
    // .then (res => res.data),
    // onSuccess: (data: any) => {
      // setChannel (data);
    // }, 
    // onError : (err) => {
      // console.log (err)
      // }
  // })

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
        <ChatBox />
      </GridItem>
      <GridItem justifyContent="center" alignItems="center" w={"100%"} h="100%">
          <ChannelSettings members={channelMembers} userRole={loggedInUserRole} channel={activeChannel!}/>        
      </GridItem>
    </Grid>
  );
};

export default ChannelsChat;
