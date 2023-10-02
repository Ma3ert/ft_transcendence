import { Button, Text, HStack, Icon, Avatar } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { UsersContext } from "@/context/Contexts";
import { FaCheck } from "react-icons/fa6";
import { CloseIcon, CheckIcon } from "@chakra-ui/icons";
import useEnviteHandler from "@/hooks/useEnviteHandler";

interface EnviteFieldProps {
  type: "sent" | "received";
  envite: Envite;
}

const EnviteField: React.FC<EnviteFieldProps> = ({ type, envite }) => {
  const [peer, setPeer] = useState<User>();
  const { Users } = useContext(UsersContext);
  const {AcceptFriendRequest, DeleteFriendRequest } = useEnviteHandler()

  useEffect(() => {
    if (type == "sent") {
      setPeer(Users!.find((user) => user.id == envite.inviteUserId));
    } else if (type == "received") {
      setPeer(Users!.find((user) => user.id == envite.inviteOwnerId));
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
          <Text>{peer?.username}</Text>
        </HStack>
        {type == "received" ? (
          <HStack spacing={5}>
            <Icon onClick={()=>AcceptFriendRequest(envite.id)} as={CheckIcon} fontSize={'20px'} _hover={{transform:'scale(1.1)'}}/>
            <Icon onClick={()=>DeleteFriendRequest (envite.id)} as={CloseIcon} fontSize={'20px'} _hover={{transform:'scale(1.1)'}}/>
          </HStack>
        ) : (
          <Text>pending</Text>
        )}
      </HStack>
    </Button>
  );
};

export default EnviteField;
