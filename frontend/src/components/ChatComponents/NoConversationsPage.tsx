import React from "react";
import { Stack, Heading, HStack, Button, Text, Icon } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";
import { useContext } from "react";
import { CHANNEL } from "../../../contstants";
import { AppNavigationContext, ChatContext } from "@/context/Contexts";
import { useRouter } from "next/navigation";
interface NoConversationsPageProps {}
const NoConversationsPage: React.FC<NoConversationsPageProps> = ({}) => {
  const { setCurrentSection } = useContext(AppNavigationContext);
  const { setCurrentChat } = useContext(ChatContext);
  const router = useRouter();
  return (
    <Stack w="100%" h="100%" justifyContent="center" alignItems="center">
      <Stack spacing={8} justifyContent={"center"} alignItems="center">
        <Heading size="md" color="#5B6171">
          You have no conversations at the moment
        </Heading>
        <HStack spacing={4} alignItems={"center"}>
          <Button
            variant="largeSecondary"
            onClick={() => router.push("/Friends")}
          >
            <HStack spacing={4} alignItems={"center"}>
              <Text fontFamily="visbyRound">Find friends</Text>
              <Icon as={FaUserPlus} size="sm" />
            </HStack>
          </Button>
          <Button variant="ghost" onClick={() => setCurrentChat!(CHANNEL)}>
            go to Channels
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default NoConversationsPage;
