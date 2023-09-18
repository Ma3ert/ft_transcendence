import {
  HStack,
  Stack,
  Text,
  Button,
  Switch,
  Icon,
  Image,
} from "@chakra-ui/react";
import { channelSettings } from "../../../contstants";
import CostumModal from "./CostumModal";
import ConfirmationModal from "./ConfirmationModal";
import CostumSwitcher from "./CostumSwitcher";
import MembersList from "./MembersList";
import SetPassword from "./SetPassword";
interface ChannelSettingsProps {}

const ChannelSettings: React.FC<ChannelSettingsProps> = ({}) => {
  // eslint-disable-next-line react/jsx-key
  const settings:Array<React.ReactNode> = [<MembersList/>, <SetPassword/>]
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
          w="100%"
          bg="#1D222C"
          borderRadius={"2xl"}
          p={4}
          alignItems={"start"}
          justify="start"
          spacing={4}
          h="auto"
          minW={"auto"}
          minH={"250px"}
          maxH="500px"
          maxW="300px"
        >
          <HStack px={4} w={"99%"} justify={"space-between"}>
            <Text color={"#5B6171"} fontSize="sm" fontWeight={"bold"}>
              {" "}
              Private{" "}
            </Text>
            <CostumSwitcher />
          </HStack>
          {channelSettings.map((setting, index) => {
            return (
              <CostumModal key={index} value={setting} buttonVariant="modal">
                {settings[index]}
              </CostumModal>
            );
          })}
        </Stack>
      </Stack>
      <Stack spacing={3}>
        <ConfirmationModal
          buttonVariant="primary"
          buttonValue="Leave channel"
          actionDescription="leave channel"
          actionKeyword="leave"
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
