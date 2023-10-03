import { Button, Text, HStack, Icon, Avatar } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { UsersContext } from "@/context/Contexts";
import { FaCheck } from "react-icons/fa6";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import useEnviteHandler from "@/hooks/useEnviteHandler";
import useChannelSettingsManager from "@/hooks/useChannelSettingsManager";

interface EnviteFieldProps {
  type: "sent" | "received";
  envite: GlobalEnvite;
}

const EnviteField: React.FC<EnviteFieldProps> = ({ type, envite }) => {
  const [peer, setPeer] = useState<User>();
  const { Users } = useContext(UsersContext);
  const {AcceptFriendRequest, DeleteFriendRequest } = useEnviteHandler()
  const {acceptChannelEnvite, declineChannelEnvite} = useChannelSettingsManager()

  useEffect(() => {
    if (type == "sent") {
      setPeer(Users!.find((user) => user.id == envite.receiverId));
    } else if (type == "received") {
      setPeer(Users!.find((user) => user.id == envite.senderId));
    }
  }, [Users]);
  return (
    <Button minH="50px" variant={"field"} w={"100%"} h="auto" p={2}>
      <HStack
        w={"100%"}
        h="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack spacing={2}>
          <Avatar size="sm" src={peer?.avatar} name={peer?.username} />
         { envite.isChannelEnvite ? <Text>{peer?.username} has envited you to join channel</Text> :  <Text>{peer?.username}</Text>}
        </HStack>
        {type == "received" ? (
          <HStack spacing={5}>
            <Icon onClick={()=>{
              if(envite.isChannelEnvite){
                const res:UserChannel = {
                  channelid: envite.channelId,
                  userid: envite.senderId
                }
                acceptChannelEnvite(res)
              }else{
                AcceptFriendRequest(envite.enviteId)
              }
            }} as={CheckIcon} fontSize={'20px'} _hover={{transform:'scale(1.1)'}}/>
            <Icon onClick={()=>{
              if(envite.isChannelEnvite){
                const res:UserChannel = {
                  channelid: envite.channelId,
                  userid: envite.senderId
                }
                declineChannelEnvite(res)
              }else{
                DeleteFriendRequest(envite.enviteId)
              }
            }} as={CloseIcon} fontSize={'20px'} _hover={{transform:'scale(1.1)'}}/>
          </HStack>
        ) : (
          <Text>pending</Text>
        )}
      </HStack>
    </Button>
  );
};

export default EnviteField;
