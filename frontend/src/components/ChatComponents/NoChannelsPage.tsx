import { ChatContext } from "@/context/Contexts";
import NewChannel from "./NewChannel";
import { Stack, Heading, HStack, Button, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { PRIVATE } from "../../../contstants";
import { ModalWrapper } from "@/components/Wrappers/ModalWrapper";

interface NoChannelsPageProps {}
const NoChannelsPage: React.FC<NoChannelsPageProps> = ({}) => {
  const { setCurrentChat } = useContext(ChatContext);
  return (
    <Stack w="100%" h="100%" justifyContent="center" alignItems="center">
      <Stack spacing={8} justifyContent={"center"} alignItems="center">
        <Heading size="md" color="#5B6171">
          You have no channes at the moment
        </Heading>
        <HStack spacing={4} alignItems={"center"}>
          <ModalWrapper
            type="regular"
            buttonVariant="largeSecondary"
            buttonValue={<Text fontFamily="visbyRound">Create channel</Text>}
          >
            <NewChannel />
          </ModalWrapper>
          <Button variant="ghost" onClick={() => setCurrentChat!(PRIVATE)}>
            go to DMs
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default NoChannelsPage;
