import { Stack, Text } from "@chakra-ui/react";
import ScrollableStack from "../ScrollableStack";
import { useContext, useEffect, useState } from "react";
import { ChannelsContext } from "@/context/Contexts";
import ChannelField from "../ChatComponents/ChannelField";
import FriendsListHeader from "../ChatComponents/FriendsListHeader";
import apiClient from "@/services/requestProcessor";
import { useQuery } from "react-query";
import { ModalWrapper } from "../Wrappers/ModalWrapper";
import NewChannel from "../ChatComponents/NewChannel";
interface ChannelsListProps {}

const ChannelsListSection: React.FC<ChannelsListProps> = ({}) => {
  const userChannelsClient = new apiClient("/chat/channels/");
  const {Channels} = useContext (ChannelsContext)

  return (
    <Stack
      w={"100%"}
      h="100%"
      spacing={5}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <FriendsListHeader type="channels"  />
      <ScrollableStack>
        {Channels!.length ? (
          Channels!.map((channel, index) => (
            <ChannelField key={index} channel={channel} />
          ))
        ) : (
          <Stack
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <p style={{ color: "#5B6171" }}>
              You have no channels at the moment
            </p>
          </Stack>
        )}
      </ScrollableStack>
    </Stack>
  );
};

export default ChannelsListSection;
