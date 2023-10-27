import React, { useContext, useEffect } from "react";
import {
  Button,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverBody,
  Stack,
  HStack,
  Text,
  Avatar,
  Checkbox,
  Icon,
} from "@chakra-ui/react";
import { UsersContext, InvitesContext } from "@/context/Contexts";
import { ImUserPlus } from "react-icons/im";
import { ImUserCheck } from "react-icons/im";
import useChannelSettingsUpdater from "@/hooks/useChannelSettingsUpdater";
import useChannelSettingsManager from "@/hooks/useChannelSettingsManager";
import { BiLoader } from "react-icons/bi";
interface Props {
  channel?: Channel;
  Members?: Member[];
}
const InviteMultipleToChannel: React.FC<Props> = ({ channel, Members }) => {
  const { friendsList } = useContext(UsersContext);
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="ghost">Invite</Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent bg={"#181D25"} border="none">
          <PopoverBody>
            <Stack
              w="100%"
              spacing={5}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Stack w="100%" justifyContent={"center"} alignItems={"center"}>
                {friendsList?.map((friend, index) => {
                  return (
                    <InviteToChannelField
                      user={friend}
                      key={index}
                      channel={channel}
                      Members={Members}
                    />
                  );
                })}
              </Stack>
              <HStack
                spacing={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Button variant={"modalConfirm"}>done</Button>
              </HStack>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

interface InviteProps extends Props {
  user?: User;
}
const InviteToChannelField: React.FC<InviteProps> = ({
  channel,
  Members,
  user,
}) => {
  const { sendChannelEnvite } = useChannelSettingsManager();
  const { channelSent } = useContext(InvitesContext);

  useEffect(() => {
    //console.log(Members);
  }, [Members, channelSent]);
  return (
    <HStack
      justifyContent={"space-between"}
      alignItems={"center"}
      w="100%"
      p={4}
    >
      <HStack spacing={4}>
        <Avatar borderRadius="15px" src={user?.avatar} />
        <Text fontSize={"md"} color="#5B6171">
          {user?.username}
        </Text>
      </HStack>
      {Members?.find((member) => member.user === user?.id) ? (
        <Icon as={ImUserCheck} color={"green.500"} fontSize="23px" />
      ) : channelSent!.find(
          (item) =>
            item.receiverId === user?.id && item.channel.id === channel?.id
        ) ? (
        <Icon as={BiLoader} color="#5B6171" fontSize="23px" />
      ) : (
        <Icon
          as={ImUserPlus}
          onClick={() => {
            sendChannelEnvite({
              channelid: channel?.id,
              userid: user?.id,
            });
          }}
          _hover={{ color: "#DC585B", transform: "scale(1.1)" }}
          color="#5B6171"
          fontSize="23px"
        />
      )}
    </HStack>
  );
};

export default InviteMultipleToChannel;
