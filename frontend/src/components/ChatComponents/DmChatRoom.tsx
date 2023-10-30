import { Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { ModalWrapper } from "../Wrappers/ModalWrapper";
import NewChannel from "./NewChannel";
import ChatBox from "./chatBox";
import ChatNavigation from "./ChatNavigation";
import { DmContext, GlobalContext, UsersContext } from "@/context/Contexts";
import { useContext } from "react";
import { useAuth } from "@/hooks/useAuth";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

interface props {}
const DmChatRoom: React.FC<props> = ({}) => {
  const { activePeer } = useContext(UsersContext);
  const { messages, setMessages } = useContext(DmContext);
  const { socket } = useContext(GlobalContext);
  const { currentUser } = useAuth();
  const dmClient = new apiClient(
    `chat/direct/${activePeer!.id}/messages?skip=0&take=500`
  );

  useQuery({
    queryKey: ["directMessages", activePeer!.id],
    queryFn: () => dmClient.getData().then((res) => res.data),
    onSuccess: (data: any) => {
      const reversed = data.slice().reverse();
      setMessages!(reversed);
    },
    onError: (err: any) => {
      ////console.log (err)
    },
  });

  useEffect(() => {
    if (activePeer && socket) {
      socket!.on("DM", (data: any) => {
        const dm: DirectMessage = {
          senderId: data.senderId,
          receiverId: data.receiverId,
          message: data.message,
        };
        const dms = Array.from(messages!);
        console.log(`active peer `);
        console.table(activePeer);
        if (
          activePeer?.id === dm.senderId ||
          currentUser!.user!.id === dm.senderId
        ) {
          dms!.push(dm);
          setMessages!(dms!);
        }
      });
    }

    return () => {
      socket!.off("DM");
    };
  }, [activePeer, messages]);
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
        <Stack justify={"end"} alignItems={"center"} w="100%" h="90%">
          <ModalWrapper
            type="regular"
            buttonVariant="largeSecondary"
            buttonValue={<Text fontFamily="visbyRound">Create channel</Text>}
          >
            <NewChannel />
          </ModalWrapper>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default DmChatRoom;
