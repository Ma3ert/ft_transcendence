import {
  Button,
  FormControl,
  HStack,
  Stack,
  Text,
  Input,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { ChannelsContext, ModalWrapperContext } from "@/context/Contexts";
import useChannelSettingsUpdater from "@/hooks/useChannelSettingsUpdater";

interface SetPasswordProps {}
const SetPassword: React.FC<SetPasswordProps> = ({}) => {
  const [password, setPassword] = useState<string>("");
  const { onClose } = useContext(ModalWrapperContext);
  const { activeChannel } = useContext(ChannelsContext);
  const { setChannelPassword } = useChannelSettingsUpdater(activeChannel!);
  return (
    <Stack
      justifyContent={"center"}
      w="100%"
      h="100%"
      alignItems={"center"}
      spacing={7}
    >
      <Text
        fontFamily="visbyRound"
        fontSize="lg"
        fontWeight="bold"
        color="#5B6171"
      >
        Protect this room with a password
      </Text>
      <FormControl
        w="100%"
        display="flex"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Input
          variant="default"
          placeholder="your password"
          w="80%"
          fontSize="sm"
          _placeholder={{ fontSize: "sm", color: "#5B6171" }}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <HStack w="100%" spacing={4} justifyContent="center" alignItems="center">
        <Button variant={"modalCancel"} onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant={"modalConfirm"}
          px={6}
          py={3}
          onClick={() => {
            setChannelPassword(password);
            onClose!();
          }}
        >
          Set password
        </Button>
      </HStack>
    </Stack>
  );
};

export default SetPassword;
