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
  useDisclosure,
} from "@chakra-ui/react";
import {
  ProtectedChannelSettings,
  channelSettings,
  ChannelMemberSettings,
} from "../../../contstants";
import CostumSwitcher from "./CostumSwitcher";
import MembersList from "./MembersList";
import SetPassword from "./SetPassword";
import { ModalWrapper } from "@/components/Wrappers/ModalWrapper";
import { SlArrowRight } from "react-icons/sl";
import useMembers from "@/hooks/useMembers";
import {
  ChannelsContext,
  MembersContext,
  UsersContext,
} from "@/context/Contexts";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/services/requestProcessor";
import useChannelManager from "@/hooks/useChannelManager";
import { getUserRole } from "../../../utils/helpers";
import EditeChannel, { VisibilityPopOver } from "./EditeChannel";
import ChannelsListSection from "../Sections/ChannelsListSection";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import InviteMultipleToChannel from "./InviteMultipleToChannel";
interface ChannelSettingsProps {
  members:Member[]
}

const ChannelSettings: React.FC<ChannelSettingsProps> = ({members}) => {
  const { removeChannel, leaveChannel } = useChannelManager();
  const [settingsList, setSettings] = useState<string[]>(channelSettings);
  const { activeChannel } = useContext(ChannelsContext);
  const { currentUser } = useAuth();

  const settings = new Map([
    [
      "Members",
      <MembersList members={members} key={''}/>,
    ],
    [
      "Set password",
      <SetPassword key={''} />,
    ],
    [
      "Edit Channel",
      <EditeChannel channel={activeChannel!} key={''}/>,
    ],
  ]);
  const settingsActions = new Map([
    ["delete", () => removeChannel(activeChannel!.id!)],
    ["leave", () => leaveChannel(activeChannel!.id!)],
  ]);

  const isPrivliged = () => {
    if ((members && members.length) &&
      getUserRole(currentUser!.user!, members!) === "OWNER" ||
      getUserRole(currentUser!.user!, members!) === "ADMIN"
    )
      return true;
    return false;
  };
  useEffect(() => {
    if (isPrivliged()) {
      if (activeChannel!.type === "PROTECTED")
        setSettings(ProtectedChannelSettings);
      else setSettings(channelSettings);
    } else {
      setSettings(ChannelMemberSettings);
    }
  }, [members]);
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
          minW={"90%"}
          maxW={"450px"}
          minH={"45vh"}
          maxH="auto"
        >
          {isPrivliged() && <VisibilityPopOver />}
          {settingsList.map((setting, index) => {
            return (
              <ModalWrapper
                isOption={false}
                type="regular"
                key={index}
                buttonVariant="largeGhost"
                variant={setting === "Members" ? "largeModal" : "default"}
                buttonValue={
                  <HStack w="100%" h="100%" justifyContent="space-between">
                    <Text fontFamily="visbyRound">{setting}</Text>
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
            ((members && members.length ) && getUserRole(currentUser!.user!, members!) == "OWNER")
              ? settingsActions.get("delete")
              : settingsActions.get("leave")
          }
          type="confirmation"
          actionDescription={`${
            ((members && members.length) && getUserRole(currentUser!.user!, members!) == "OWNER")
              ? "Delete"
              : "Leave"
          } Channel`}
          buttonValue={
            <Text fontFamily="visbyRound">
              {((members && members.length) && getUserRole(currentUser!.user!, members!) == "OWNER")
                ? "Delete"
                : "Leave"}{" "}
              Channel
            </Text>
          }
          buttonVariant="largePrimary"
          isOption={false}
        />
        <InviteMultipleToChannel Members={members} channel={activeChannel!} />
      </Stack>
    </Stack>
  );
};

export default ChannelSettings;
