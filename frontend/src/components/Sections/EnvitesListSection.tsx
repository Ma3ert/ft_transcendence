import {
  Stack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import ScrollableStack from "../ScrollableStack";
import "../../theme/styles.css";
import { useState } from "react";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";
import EnviteField from "../ChatComponents/EnviteField";
import { useContext, useEffect } from "react";
import { UsersContext } from "@/context/Contexts";
const EnvitesListSection: React.FC = () => {
  const { RecievedFriendRequests, SentFriendRequests } =
    useContext(UsersContext);
  const [sentEnvites, setSentEnvites] = useState<Envite[]>([]);
  const [recievedEnvites, setRecievedEnvites] = useState<Envite[]>([]);

  useEffect (() => {
    setRecievedEnvites (RecievedFriendRequests!)
    setSentEnvites (SentFriendRequests!)

  }, [RecievedFriendRequests, SentFriendRequests])
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
      maxW={{ sm: "400px", md: "450px", lg: "500px", xl: "700px" }}
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
              {RecievedFriendRequests!.length ? (
                RecievedFriendRequests!.map((envite, index) => (
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
              {SentFriendRequests!.length ? (
                SentFriendRequests!.map((envite, index) => (
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
