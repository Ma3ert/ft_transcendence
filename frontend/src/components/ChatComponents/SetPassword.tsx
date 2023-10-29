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
import { z } from "zod";

interface SetPasswordProps {}
const SetPassword: React.FC<SetPasswordProps> = ({}) => {
  const [password, setPassword] = useState<string>("");
  const { onClose } = useContext(ModalWrapperContext);
  const { activeChannel } = useContext(ChannelsContext);
  const { setChannelPassword } = useChannelSettingsUpdater(activeChannel!);
  const passwordSchema = z.string().min(7).max(20).refine((val) => val !== "");
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
       <Stack w="100%" spacing={6} justify={"center"} alignItems="center">
       <Input
          variant="default"
          placeholder="your password"
          w="80%"
          fontSize="sm"
          _placeholder={{ fontSize: "sm", color: "#5B6171" }}
          onChange={(e) => setPassword(e.target.value)}
        />

       {passwordSchema.safeParse(password).success && (
       <Text fontFamily="visbyRound" color="#5B6171" fontSize="sm">
       Password must be at least 7 characters
     </Text>)  
      }
       </Stack>
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
