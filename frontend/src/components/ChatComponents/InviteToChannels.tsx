import { useContext, useEffect, useState } from "react";
import ScrollableStack from "../ScrollableStack";
import {
  HStack,
  Stack,
  Button,
  Text,
  Avatar,
  Icon,
  Checkbox,
} from "@chakra-ui/react";
import { ChannelsContext } from "@/context/Contexts";
import useChannelSettingsManager from "@/hooks/useChannelSettingsManager";
import { ModalWrapperContext, MembersContext } from "@/context/Contexts";
import UserAvatar from "../UserAvatar";
import { CheckIcon } from "@chakra-ui/icons";
import MembersProvider from "@/providers/MemberProvider";
interface InviteToChannelsProps {
  user: User;
}

interface ChannelInviteFieldProps {
  channel: Channel;
  user: User;
  handleSelect: (channel: Channel) => void;
}

const checkIdMember = (members: Member[], user: User) => {
  let isMember = false;

  members.forEach((member) => {
    if (member.user === user.id) {
      isMember = true;
    }
  });

  return isMember;
};

const ChannelInviteField: React.FC<ChannelInviteFieldProps> = ({
  channel,
  user,
  handleSelect,
}) => {
  const { members } = useContext(MembersContext);

  return (
    <Button w="100%" px={4} py={4} minH={"60px"} variant={"field"}>
      <HStack justifyContent={"space-between"} w={"100%"}>
        <HStack spacing={3}>
          <UserAvatar isChannel={true} channel={channel} />
          <Text>{channel.name}</Text>
        </HStack>

        {checkIdMember(members!, user) ? (
          <Icon as={CheckIcon} color={"green.500"} />
        ) : (
          <Checkbox
            variant={"default"}
            onChange={() => handleSelect(channel)}
          />
        )}
      </HStack>
    </Button>
  );
};

const InviteToChannels: React.FC<InviteToChannelsProps> = ({ user }) => {
  const { Channels } = useContext(ChannelsContext);
  const [selectedChannels, setSelectedChannels] = useState<Channel[]>([]);
  const { sendChannelEnvite } = useChannelSettingsManager();
  const { onClose } = useContext(ModalWrapperContext);

  const handleSelect = (channel: Channel) => {
    if (selectedChannels.includes(channel)) {
      setSelectedChannels(selectedChannels.filter((ch) => ch !== channel));
    } else {
      setSelectedChannels([...selectedChannels, channel]);
    }
  };

  const sendEnvites = () => {
    selectedChannels.forEach((channel) => {
      const envite: UserChannel = {
        channelid: channel.id,
        userid: user.id,
      };
      sendChannelEnvite(envite);
      //console.log(`enviting to ${channel.name}`);
    });
  };

  useEffect(() => {
    //console.log(selectedChannels);
  }, [selectedChannels]);
  return (
    <Stack
      spacing={8}
      w="100%"
      h="100%"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack
        spacing={3}
        overflowY={"auto"}
        maxW={"100%"}
        w={"100%"}
        maxH={"50vh"}
      >
        {Channels!.map((channel, index) => (
          <MembersProvider key={index} channelId={channel.id}>
            <ChannelInviteField
              channel={channel}
              user={user}
              handleSelect={handleSelect}
              key={index}
            />
          </MembersProvider>
        ))}
      </Stack>

      <HStack spacing={4}>
        <Button
          onClick={() => {
            sendEnvites();
            onClose!();
          }}
          variant="modalConfirm"
        >
          Envite
        </Button>
        <Button variant="modalCancel" onClick={onClose}>
          Cancel
        </Button>
      </HStack>
    </Stack>
  );
};

export default InviteToChannels;
