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
  useDisclosure
} from "@chakra-ui/react";
import { ProtectedChannelSettings, channelSettings, ChannelMemberSettings } from "../../../contstants";
import CostumSwitcher from "./CostumSwitcher";
import MembersList from "./MembersList";
import SetPassword from "./SetPassword";
import { ModalWrapper } from "@/components/Wrappers/ModalWrapper";
import { SlArrowRight } from "react-icons/sl";
import { ChannelsContext, MembersContext, UsersContext } from "@/context/Contexts";
import { useQuery } from "react-query";
import apiClient from "@/services/requestProcessor";
import useChannelManager from "@/hooks/useChannelManager";
import { getUserRole } from "../../../utils/helpers";
import EditeChannel, {VisibilityPopOver} from "./EditeChannel";
import ChannelsListSection from "../Sections/ChannelsListSection";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
interface ChannelSettingsProps {
}

const ChannelSettings: React.FC<ChannelSettingsProps> = ({}) => {
  // eslint-disable-next-line react/jsx-key
  const { removeChannel, leaveChannel } = useChannelManager();
  const [settingsList, setSettings] = useState<string[]> (channelSettings)
  const {members} = useContext (MembersContext)
  const {activeChannel} = useContext (ChannelsContext)
  const {currentUser} = useAuth ()

  const settings = new Map([
    [
      "Members",
      // eslint-disable-next-line react/jsx-key
       <MembersList  members={members!} />,
    ],
    [
      "Set password",
      // eslint-disable-next-line react/jsx-key
       <SetPassword />,
    ],
    [
      "Edit Channel",
      // eslint-disable-next-line react/jsx-key
       <EditeChannel channel={activeChannel!} />,
    ]
   
  ]);
  const settingsActions = new Map([
    ["delete", () => removeChannel(activeChannel!.id!)],
    ["leave", () => leaveChannel(activeChannel!.id!)],
  ]);

  const isPrivliged = () =>{
    if (getUserRole (currentUser!, members!) === "OWNER" || getUserRole (currentUser!, members!)  === 'ADMIN')
      return true
    return false
  }
  useEffect (()=>{
    console.log (`channel type : -----> ${activeChannel!.type}`)
    console.log (`logged in user role : -----> ${getUserRole (currentUser!, members!)}`)
    console.table (members)
    if (isPrivliged ()) {
      if (activeChannel!.type === 'PROTECTED')
        setSettings (ProtectedChannelSettings)
      else
        setSettings (channelSettings)
    } else {
        setSettings (ChannelMemberSettings)
      }
  }, [members])
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
           {isPrivliged () && (<VisibilityPopOver />)}
          {settingsList.map((setting, index) => {
            return (
              <ModalWrapper
                isOption={false}
                type="regular"
                key={index}
                buttonVariant="largeGhost"
                variant={setting === 'Members' ? 'largeModal' : 'default'}
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
              getUserRole (currentUser!, members!) == "OWNER"
              ? settingsActions.get("delete")
              : settingsActions.get("leave")
          }
          type="confirmation"
          actionDescription={`${getUserRole (currentUser!, members!) == "OWNER" ? "Delete" : "Leave"} Channel`}
          buttonValue={
            <Text>
              {getUserRole (currentUser!, members!) == "OWNER" ? "Delete" : "Leave"} Channel
            </Text>
          }
          buttonVariant="largePrimary"
          isOption={false}
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
