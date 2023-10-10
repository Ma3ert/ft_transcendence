import {
  FormControl,
  Stack,
  Input,
  HStack,
  Button,
  Text,
} from "@chakra-ui/react";
import layoutStyles from "../../Styles/modules/layout.module.scss";
import UserAvatar from "../UserAvatar";
import { useState, useEffect } from "react";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";
import MemberField from "./Memberfield";
import ScrollableStack from "../ScrollableStack";
import FriendsListHeader from "./FriendsListHeader";
interface MembersListProps {
  members: Member[];
}
const MembersList: React.FC<MembersListProps> = ({ members, channel }) => {
  return (
    <Stack
      spacing={4}
      w="100%"
      h="100%"
      maxH="100%"
      justifyContent={"center"}
      alignItems={"center"}
    >
      {members.length ? (
        <>
          {" "}
          <FriendsListHeader />
          <ScrollableStack h="50vh">
            {members!.map((member, index) => {
              return (
                <MemberField member={member} key={index} members={members} />
              );
            })}
          </ScrollableStack>
        </>
      ) : (
        <Text color="#5B6171" fontSize="sm">
          this channel has no members
        </Text>
      )}
    </Stack>
  );
};

export default MembersList;
