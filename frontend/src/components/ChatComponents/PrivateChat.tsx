import { Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import ChatNavigation from "./ChatNavigation";
import ChatBox from "./chatBox";
import { ModalWrapper } from "../Wrappers/ModalWrapper";
import NewChannel from "./NewChannel";

interface PrivateChatProps {}

const PrivateChat: React.FC<PrivateChatProps> = () => {
  return (
    <Grid
      templateColumns={{ sm: "10% 80%", lg: "20% 60% 20%" }}
      w={{ base: "100%", lg: "100%", xl: "90%", vl: "85%" }}
      // border="1px"
      // borderColor="green"
      h="100%"
      mx="auto"
      justifyContent="space-between"
      alignItems="center"
    >
      <GridItem justifyContent="center" alignItems="center" h="100%">
        <ChatNavigation />
      </GridItem>
      <GridItem justifyContent="center" alignItems="center" w={"100%"} h="100%">
        <ChatBox />
      </GridItem>
      <GridItem justifyContent="center" alignItems="center" w={"100%"} h="100%">
        <Stack justify={"end"} alignItems={"center"} w="100%" h="90%">
          <ModalWrapper
            type="regular"
            buttonVariant="largeSecondary"
            buttonValue={<Text>Create channel</Text>}
          >
            <NewChannel />
          </ModalWrapper>
        </Stack>
      </GridItem>
    </Grid>
  );
};


export default PrivateChat