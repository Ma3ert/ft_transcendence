import React, { useContext, useState } from "react";
import {
  HStack,
  Stack,
  Text,
  Button,
  Switch,
  Icon,
  Image,
  Wrap,
} from "@chakra-ui/react";
import { channelSettings } from "../../../contstants";
import CostumSwitcher from "./CostumSwitcher";
import MembersList from "./MembersList";
import SetPassword from "./SetPassword";
import { ModalWrapper } from "@/components/Wrappers/ModalWrapper";
import { SlArrowRight } from "react-icons/sl";
import { ChannelsContext, UsersContext } from "@/context/Contexts";
import { useQuery } from "react-query";
import apiClient from "@/services/requestProcessor";
import useChannelManager from "@/hooks/useChannelManager";
interface ChannelSettingsProps {}

const ChannelSettings: React.FC<ChannelSettingsProps> = ({}) => {
  // eslint-disable-next-line react/jsx-key
  const [channelMembers, setChannelMembers] = useState<Member[]>([]);
  const { activeChannel } = useContext(ChannelsContext);
  const { loggedInUser } = useContext(UsersContext);
  const { removeChannel, leaveChannel } = useChannelManager();
  const channelMembersClient = (channelId: string) =>
    new apiClient(`/chat/channels/${channelId}/members`);
  // eslint-disable-next-line react/jsx-key
  const settings = new Map([
    [
      "Members",
      // eslint-disable-next-line react/jsx-key
      <MembersList members={channelMembers} />,
    ],
    [
      "Set Password",
      // eslint-disable-next-line react/jsx-key
      <SetPassword />,
    ],
  ]);

  const settingsActions = new Map([
    ["delete", () => removeChannel(activeChannel!.id!)],
    ["leave", () => leaveChannel(activeChannel!.id!)],
  ]);

  useQuery({
    queryKey: ["channelMembers", activeChannel?.id],
    queryFn: async () =>
      channelMembersClient(activeChannel!.id!)
        .getData()
        .then((res) => res.data),
    onSuccess: (data: any) => {
      setChannelMembers(data);
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const loggedInUserRole = () => {
    const user = channelMembers.find(
      (member) => member.userId === loggedInUser!.id
    );
    if (user) return user.role;
    return null;
  };

  return (
    <Stack
      spacing={5}
      justifyContent={"space-around"}
      alignItems={"center"}
      h="100%"
      w="100%"
    >
      <Stack spacing={3} w="100%" justify={"center"} alignItems={"center"}>
        <Image
          src="/settings.png"
          alt="settings"
          w={8}
          h={"auto"}
          _hover={{ opacity: 0.8, transform: "scale(1.1)" }}
        />
        <Stack
          w="auto"
          bg="#1D222C"
          borderRadius={"2xl"}
          px={4}
          py={6}
          alignItems={"start"}
          justify="start"
          spacing={4}
          h="auto"
          minW={"auto"}
          minH={"45vh"}
          maxH="auto"
        >
          <HStack px={2} justify={"space-between"} alignItems={"center"}>
            <Text color={"#5B6171"} fontSize="sm" fontWeight={"bold"}>
              Private Channel
            </Text>
            <CostumSwitcher />
          </HStack>
          {channelSettings.map((setting, index) => {
            return (
              <ModalWrapper
                type="regular"
                key={index}
                buttonVariant="largeGhost"
                buttonValue={
                  <HStack w="100%" h="100%" justifyContent="space-between">
                    <Text>{setting}</Text>
                    <Icon as={SlArrowRight} />
                  </HStack>
                }
              >
                {settings.get(setting)!}
              </ModalWrapper>
            );
          })}
        </Stack>
      </Stack>
      <Stack spacing={3}>
        <ModalWrapper
          action={
            loggedInUserRole() == "OWNER"
              ? settingsActions.get("delete")
              : settingsActions.get("leave")
          }
          type="confirmation"
          actionDescription={`${loggedInUserRole() == "OWNER" ? "Delete" : "Leave"} Channel`}
          buttonValue={
            <Text>
              {loggedInUserRole() == "OWNER" ? "Delete" : "Leave"} Channel
            </Text>
          }
          buttonVariant="largePrimary"
        />
        <Button
          colorScheme="darkGhost"
          color={"#5B6171"}
          borderRadius={"2xl"}
          _hover={{ opacity: 0.8 }}
        >
          Envite
        </Button>
      </Stack>
    </Stack>
  );
};

export default ChannelSettings;
