
import React from "react";
import { HStack, Avatar, Stack, Text } from "@chakra-ui/react";
import { useContext , useEffect} from "react";
import { UsersContext , GlobalContext} from "@/context/Contexts";

interface PeerHeaderProps {}
const PeerHeader: React.FC<PeerHeaderProps> = () => {

    const {activePeer, userStatus, setUserStatus} = useContext (UsersContext)
    const { socket } = useContext(GlobalContext);

  useEffect(() => {
    socket!.emit("checkStatus", { userId: activePeer!.id });
    socket!.on("checkStatus", (res:any) => {
      console.log("status");
      console.log(res);
      setUserStatus!(res.status);
    });
  }, [userStatus]);
  return (
    <HStack spacing={4} alignItems="center">
      <Avatar
        borderRadius={"full"}
        src={activePeer?.avatar!}
        name={activePeer?.username}
        size="sm"
      />
      <Stack spacing={2}>
        <Text fontWeight={"bold"} fontSize={"sm"} color="#5B6171">
          {activePeer?.username}
        </Text>
        <Text
          fontSize={"xs"}
          fontWeight={"bold"}
          color={userStatus === "ONLINE" ? "green.300" : "#5B6171"}
        >
          {userStatus?.toLowerCase()}
        </Text>
      </Stack>
    </HStack>
  );
};


export default PeerHeader;