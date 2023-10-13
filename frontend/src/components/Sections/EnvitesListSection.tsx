import {
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Text,
} from "@chakra-ui/react";
import ScrollableStack from "../ScrollableStack";
import "../../theme/styles.css";
import { useState } from "react";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";
import EnviteField from "../ChatComponents/EnviteField";
import { useContext, useEffect } from "react";
import { UsersContext, ChannelsContext } from "@/context/Contexts";


const  getGlobalChannelEnvites = (envites: ChannelEnvite[]) => {

  const response: GlobalEnvite[] = envites.map((envite) => ({
    isChannelEnvite: true,
    enviteId: envite.id,
    senderId: envite.sender,
    receiverId: envite.receiver, // Add receiverId property
    createdAt: envite.created_at,
    channel: envite.channel,
  }));

  return response;
}

const getGlobalFriendsEnvites = (envites: Envite[]) => {

  const response :GlobalEnvite[] = envites.map((envite) => ({
    isChannelEnvite: false,
    enviteId: envite.id,
    senderId: envite.inviteOwnerId,
    receiverId: envite.inviteUserId, // Add receiverId property
    createdAt: envite.createdAt,
  }));
  return response
}

const EnvitesListSection: React.FC = () => {
  const { loggedInUser } =
    useContext(UsersContext);
  const channelReceivedEnvitesClient = new apiClient(
    "/chat/channels/invites/recieved/"
  );
  const channelSentEnvitesClient = new apiClient("/chat/channels/invites/sent");
  const [sentEnvites, setSentEnvites] = useState<GlobalEnvite[]>([]);
  const [recievedEnvites, setRecievedEnvites] = useState<GlobalEnvite[]>([]);
  const recievedClient = new apiClient("/invites/received");
  const sentClient = new apiClient("/invites/sent");

  useQuery("recievedEnvites", {
    queryFn: async () => recievedClient.getData().then((data) => data.data),
    onSuccess: (response: any) => {
      if (!recievedEnvites.find((envite) => envite.enviteId === response.data.id))
        setRecievedEnvites([...recievedEnvites, ...getGlobalFriendsEnvites(response.data)]);
    },
    onError: (error) => {
      // console.log(error);
    },
  });

  useQuery("sentEnvites", {
    queryFn: async () => sentClient.getData().then((data) => data.data),
    onSuccess: (response: any) => {
      // console.log(`sent envites : ${response}`);
      // console.table (response)
      if (!sentEnvites.find((envite) => envite.enviteId === response.data.id))
        setSentEnvites([...sentEnvites, ...getGlobalFriendsEnvites(response.data)]);
    },
    onError: (error) => {
      // console.log(error);
    },
  });
  
useQuery ('channelReceivedEnvites', {
    queryFn: () => channelReceivedEnvitesClient.getData().then(res => res.data),
    onSuccess: (data:any) => {
      if (data && data.length)
      {
        if (!recievedEnvites.find((envite) => envite.enviteId === data.channel!.id))
          setRecievedEnvites([...recievedEnvites, ...getGlobalChannelEnvites(data)])
      }
      // console.log ('channel envites')
      // console.table (data)
    },
    onError: (err) => {
        // console.log(err)
    }
})    
useQuery ('channelSentEnvites', {
  queryFn: () => channelSentEnvitesClient.getData().then(res => res.data),
  onSuccess: (data:any) => {
    if (data && data.length)
    {
      if ( !sentEnvites.find((envite) => envite.enviteId === data.channel!.id))
        setSentEnvites([...sentEnvites, ...getGlobalChannelEnvites(data)])
    }
      // console.log ('channel envites')
      // console.table (data)
  },
  onError: (err) => {
      // console.log(err)
  }
})

  useEffect(() => {
  }, [recievedEnvites, sentEnvites]);
  return (
    <Stack
      fontFamily={"visbyRound"}
      justifyContent="start"
      alignItems="center"
      w={"100%"}
      h={"65vh"}
      borderRadius={"20px"}
      maxH={"70vh"}
      bg={"#1D222C"}
      maxW={{ sm: "450px", md: "550px", lg: "600px", xl: "900px" }}
      minW={{ sm: "250px", md: "300px", lg: "350px", xl: "400px" }}
      spacing={2}
      px={4}
      py={6}
    >
      <Tabs isFitted variant="enclosed" w="100%">
        <TabList mb="1em" w="100%" border="none">
          <Tab
            border={"none"}
            borderRadius={"15px"}
            color="#5B6171"
            _selected={{ bg: "#5B6171", color: "#1D222C" }}
          >
            Recieved Envites
          </Tab>
          <Tab
            border={"none"}
            borderRadius={"15px"}
            color="#5B6171"
            _selected={{ bg: "#5B6171", color: "#1D222C" }}
          >
            Sent Envites
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack
              w="100%"
              h="100%"
              maxH="100%"
              overflowY="auto"
              className="customScroll"
            >
              {recievedEnvites!.length ? (
                recievedEnvites!.map((envite, index) => (
                  <EnviteField key={index} type="received" envite={envite} />
                ))
              ) : (
                <Stack
                  w="100%"
                  h="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <p style={{ color: "#5B6171" }}>No Sent Envites</p>
                </Stack>
              )}
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack
              w="100%"
              h="100%"
              maxH="100%"
              overflowY="auto"
              className="customScroll"
            >
              {sentEnvites!.length ? (
                sentEnvites!.map((envite, index) => (
                  <EnviteField key={index} type="sent" envite={envite} />
                ))
              ) : (
                <Stack
                  w="100%"
                  h="100%"
                  justifyContent="center"
                  alignItems="center"
                >
                  <p style={{ color: "#5B6171" }}>No Recieved Envites</p>
                </Stack>
              )}
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  );
};

export default EnvitesListSection;
