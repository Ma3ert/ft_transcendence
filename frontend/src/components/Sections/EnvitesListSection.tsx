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
import { useQuery } from "@tanstack/react-query";
import EnviteField from "../ChatComponents/EnviteField";
import { useContext, useEffect } from "react";
import {
  UsersContext,
  ChannelsContext,
  GlobalContext,
  InvitesContext,
} from "@/context/Contexts";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import useInvites from "@/hooks/useInvites";

const EnvitesListSection: React.FC = () => {
  const { socket } = useContext(GlobalContext);
  const { currentUser } = useAuth();
  const router = useRouter();
  const { recievedEnvites, sentEnvites, channelReceivedEnvites, channelSentEnvites } = useInvites();
  const [recievedEnvitesList, setRecievedEnvitesList] = useState<GlobalEnvite[]>([]);
  const [sentEnvitesList, setSentEnvites] = useState<GlobalEnvite[]>([]);


  const getGlobalChannelEnvites = (envites: ChannelEnvite[]) => {
    const response: GlobalEnvite[] = envites.map((envite) => ({
      isChannelEnvite: true,
      enviteId: envite.id,
      senderId: envite.sender,
      receiverId: envite.receiver, // Add receiverId property
      createdAt: envite.created_at,
      channel: envite.channel,
    }));

    return response;
  };

  const getGlobalFriendsEnvites = (envites: Envite[]) => {
    const response: GlobalEnvite[] = envites.map((envite) => ({
      isChannelEnvite: false,
      enviteId: envite.id,
      senderId: envite.inviteOwnerId,
      receiverId: envite.inviteUserId, // Add receiverId property
      createdAt: envite.createdAt,
    }));
    return response;
  };

  useEffect(() => {

    if (recievedEnvites && recievedEnvites.data && recievedEnvites.data.length) {
      const newList: GlobalEnvite[] = getGlobalFriendsEnvites(recievedEnvites.data);
      setRecievedEnvitesList(newList);
    }
    if (sentEnvites && sentEnvites.data && sentEnvites.data.length) {
      const newList: GlobalEnvite[] = getGlobalFriendsEnvites(sentEnvites.data);
      setSentEnvites(newList);
    }
    if (channelReceivedEnvites! && channelReceivedEnvites!.length) {
      const newList: GlobalEnvite[] = getGlobalChannelEnvites(channelReceivedEnvites!);
      setRecievedEnvitesList(newList);
    }

    if (channelSentEnvites! && channelSentEnvites!.length) {
      const newList: GlobalEnvite[] = getGlobalChannelEnvites(channelSentEnvites!);
      setSentEnvites (newList);
    }
    if (socket) {
      socket!.emit("readInviteNotification", {
        userId: currentUser!.user.id,
      });
    }
  }, [recievedEnvites, sentEnvites, channelReceivedEnvites, channelSentEnvites]);
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
      overflowY={'auto'}
      className="customScroll"
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
              {recievedEnvitesList!.length ? (
                recievedEnvitesList!.map((envite, index) => (
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
              {sentEnvitesList!.length ? (
                sentEnvitesList!.map((envite, index) => (
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
