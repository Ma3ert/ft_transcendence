import { FormControl, Stack, Input, HStack, Button, Text } from "@chakra-ui/react";
import layoutStyles from "../../Styles/modules/layout.module.scss";
import UserAvatar from "../UserAvatar";
import {useState, useEffect} from 'react';
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";
import MemberField from "./Memberfield";
import ScrollableStack from "../ScrollableStack";
interface MembersListProps {
  members: Member[];
}
const MembersList: React.FC<MembersListProps> = ({members}) => {



  return (
    <Stack spacing={4} w="100%" h='100%' maxH='100%' >
      <FormControl w="100%">
        <Input
          variant="default"
          w="95%"
          placeholder="searching for a friend !!"
        />
      </FormControl>
      <ScrollableStack
      h='40vh'
      >
        {members!.map((member, index) => {
          return (
            <MemberField member={member} key={index} />
          );
        })}
      </ScrollableStack>
    </Stack>
  );
};

export default MembersList;
