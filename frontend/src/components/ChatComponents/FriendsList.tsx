import React, { useState } from "react";
import { Avatar, Stack, HStack, Text } from "@chakra-ui/react";
import UserAvatar from "../UserAvatar";
import FilterBox from "./FilterBox";
import {FaUserAlt} from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import IconButton from "../IconButton";
interface FriendsListProps {
  friends?: User[];
  channels?: Channel[];
  isForChannel: boolean;
}
const FriendsList: React.FC<FriendsListProps> = ({ friends ,channels, isForChannel}) => {
  const [isChannel, setIsChannel] = useState<boolean>(isForChannel);
  return (
    <Stack justify={'center'} alignItems={'center'} spacing={2} h={'100%'}>
      <IconButton
        color="#5B6171"
        onClick={() => setIsChannel(!isChannel)}
        icon={isChannel ? FaUserGroup : FaUserAlt  }
        size={'25px'}
      />
      <Stack w="auto" borderRadius={"2xl"} p={4} bg={"#1D222C"} spacing={2} h={'96%'}>
        {
          isChannel ? channels?.map((channel, index) => {
            return (
              <HStack
                spacing={4}
                key={index}
                alignItems={"center"}
                borderRadius={"2xl"}
                w="98%"
                _hover={{ bg: "#252932" }}
              >
                <UserAvatar
                  isChannel={true}  
                  channel={channel}
                />
              </HStack>
            );
          })
          
          : 
        
          friends?.map((friend, index) => {
          return (
            <HStack
              spacing={4}
              key={index}
              alignItems={"center"}
              borderRadius={"2xl"}
              w="98%"
              _hover={{ bg: "#252932" }}
            >
              <UserAvatar
                isChannel={false}
                user={friend}
              />
            </HStack>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default FriendsList;
