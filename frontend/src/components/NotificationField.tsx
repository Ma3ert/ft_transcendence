import { Avatar, Button, Wrap, Text, Divider, Stack, Box } from '@chakra-ui/react';
import IconButton from './IconButton';
import {IoClose} from "react-icons/io5"
import {FaCheck} from "react-icons/fa"
import { ReactNode } from 'react';

type Props = {
  Icon: ReactNode;
  senderAvatar: string;
  senderUserName: string;
  notifType: string;
  time: string;
}

const NotificationField = ({Icon, senderAvatar, senderUserName, notifType, time}: Props) => {
  var message: string;
  if (notifType === "Friend-request")
    message = senderUserName + " send a friend request";
  else
    message = senderUserName + "invite you to a channel"
  return (
    <Button variant={"field"} w={"400px"} h={"70px"}>
      <Wrap align={"center"} spacing={"20px"}>
        <Wrap align={'center'} spacing={"22px"}>
          {Icon}
          <Divider orientation='vertical' h={"30px"} border={"2px solid"} borderRadius={"full"} p={0}/>
          <Avatar src={senderAvatar} boxSize={"45px"}></Avatar>
        </Wrap>
        <Stack align={"start"} spacing={"3px"}>
          <Text fontSize={"15px"}>{message}</Text>
          <Text fontSize={"10px"}>6d</Text>
        </Stack>
      </Wrap>
    </Button>
  )
}

export default NotificationField