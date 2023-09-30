/* eslint-disable react/jsx-key */
import { Stack, Text } from "@chakra-ui/react";
import { AppNavigationContext } from "@/context/Contexts";
import { useContext } from "react";
import UserField from "../UserField";
import UserRequest from "../UserRequest";
import ScrollableStack from "../ScrollableStack";
import FriendsListHeader from "../ChatComponents/FriendsListHeader";
import FriendsListSection from "./FriendsListSection";
import ChatProvider from "@/providers/ChatProvider";
import ChannelsListSection from "./ChannelsListSection";
interface FriendsSectionProps {}
const FriendsSection: React.FC<FriendsSectionProps> = ({}) => {
  const { friendsSection } = useContext(AppNavigationContext);

  return (
    <ChatProvider>
      <Stack
        w="100%"
        h="100%"
        justify={"center"}
        alignItems={"center"}
        border="1px"
        borderColor="red"
        spacing={3}
        align={"center"}
        justifyContent="center"
      >
        {friendsSection === "friends" ? <FriendsListSection /> : <ChannelsListSection />}
      </Stack>
    </ChatProvider>
  );
};

export default FriendsSection;
