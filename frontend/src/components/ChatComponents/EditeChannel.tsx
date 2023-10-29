import {
  Box,
  Icon,
  Stack,
  HStack,
  Text,
  Popover,
  Button,
  PopoverContent,
  PopoverTrigger,
  FormControl,
  Input,
  PopoverCloseButton,
  PopoverBody,
  Avatar,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  useDisclosure,
  Toast,
} from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { SlArrowRight } from "react-icons/sl";
import { ChannelsContext, ModalWrapperContext } from "@/context/Contexts";
import { useContext } from "react";
import useChannelSettingsUpdater from "@/hooks/useChannelSettingsUpdater";
import CostumSwitcher from "@/components/ChatComponents/CostumSwitcher";
import { HiMiniUserGroup } from "react-icons/hi2";
import AvatarUploader from "./AvatarUploader";
import {z} from "zod"
import { useToast } from "@chakra-ui/react";
import { useSuccess, useFailure } from "@/hooks/useAlerts";


interface EditChannelProps {
  channel: Channel;
}

interface EditPopOverProps {
  state?: string;
  stateSetter?: React.Dispatch<React.SetStateAction<string>>;
}
export const VisibilityPopOver: React.FC<EditPopOverProps> = ({
  state,
  stateSetter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeChannel } = useContext(ChannelsContext);
  const { changeVisibility } = useChannelSettingsUpdater(activeChannel!);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const [isPrivate, setIsPrivate] = useState(activeChannel!.type === "PRIVATE");

  return (
    <Menu isOpen={isOpen}>
      <MenuButton
        onClick={onOpen}
        as={Button}
        variant="largeGhost"
        w="100%"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <HStack w="100%" h="100%" justifyContent="space-between">
          <Text fontFamily="visbyRound">Visibility</Text>
          <Icon as={SlArrowRight} />
        </HStack>
      </MenuButton>
      <MenuList bg="#181D25" border="none">
        <MenuItem bg="transparent" border="none">
          <HStack
            w="100%"
            px={2}
            justify={"space-between"}
            alignItems={"center"}
          >
            <Text
              fontFamily="visbyRound"
              color={"#5B6171"}
              fontSize="sm"
              fontWeight={"bold"}
            >
              Private Channel
            </Text>
            <CostumSwitcher state={isPrivate} stateSetter={setIsPrivate} />
          </HStack>
        </MenuItem>
        <MenuItem bg="transparent" border="none">
          <HStack w="100%" spacing={5} py={2}>
            <Button variant="ghost" color={"#DC585B"} onClick={onClose}>
              cancel
            </Button>
            <Button
              variant="ghost"
              color={"#5B6171"}
              onClick={() => {
                if (isPrivate != (activeChannel!.type === "PRIVATE"))
                  changeVisibility(
                    activeChannel!.id!,
                    isPrivate ? "PRIVATE" : "PUBLIC"
                  );
                onClose();
              }}
            >
              done
            </Button>
          </HStack>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

const EditChannel: React.FC<EditChannelProps> = ({ channel }) => {
  const [channelName, setChannelName] = useState(channel.name);
  const { onClose } = useContext(ModalWrapperContext);
  const { changeChannelName, changeChannelPassword, removeChannelPassword } =
    useChannelSettingsUpdater(channel);
  const [isPasswordEditable, SetPasswordEditable] = useState(false);
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const channelNameSchema = z.string().min(3).max(20).refine((val) => val !== "");
  const passwordSchema = z.string().min(7).max(20).refine((val) => val !== "");
  const toast = useToast ()
  const success = useSuccess ();
  const failure = useFailure ();

  return (
    <Stack justifyContent={"center"} alignItems={"center"} spacing={6}>
      <AvatarUploader channel={channel} />
      <Input
        variant={"default"}
        _placeholder={{ color: "#5B6171", fontSize: "sm" }}
        placeholder={"Channel Name"}
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      {channel.type === "PROTECTED" && (
        <Stack w="100%" justifyContent={"center"} alignItems="center">
          <Button
            color={"#DC585B"}
            variant="ghost"
            onClick={() => SetPasswordEditable(true)}
            w="100%"
          >
            <HStack
              w="100%"
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Text
                fontFamily="visbyRound"
                color={"#5B6171"}
                fontSize={"sm"}
                fontWeight={"bold"}
              >
                change password
              </Text>
              <Icon as={FaPen} fontSize="sm" color={"#5B6171"} />
            </HStack>
          </Button>
          <Button
            color={"#DC585B"}
            variant="ghost"
            onClick={() => removeChannelPassword()}
            w="100%"
          >
            <HStack
              w="100%"
              justifyContent={"space-between"}
              alignItems="center"
            >
              <Text
                fontFamily="visbyRound"
                color={"#DC585B"}
                fontSize={"sm"}
                fontWeight={"bold"}
              >
                remove password
              </Text>
              <Icon as={CloseIcon} fontSize="sm" color={"#DC585B"} />
            </HStack>
          </Button>
        </Stack>
      )}
      {isPasswordEditable && (
        <Stack spacing={3}>
          <Input
            variant={"default"}
            _placeholder={{ color: "#5B6171", fontSize: "sm" }}
            placeholder={"set current password"}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            variant={"default"}
            _placeholder={{ color: "#5B6171", fontSize: "sm" }}
            placeholder={"set new password"}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>
      )}
      <HStack spacing={3}>
        <Button variant="modalCancel" onClick={onClose}>
          cancel
        </Button>
        <Button
          variant="modalConfirm"
          onClick={() => {

            if (channelName !== channel.name && !channelNameSchema.safeParse(channelName).success)
            {
              toast (failure ("channel name must be between 3 and 20 characters"));
              return;
            } 
            if (isPasswordEditable && !passwordSchema.safeParse(password).success)
            {
              toast (failure ("password must be between 7 and 20 characters"));
              return;
            }
            if (isPasswordEditable && password.length) {
              changeChannelPassword(currentPassword, password);
            }
            if (channelName !== channel.name) changeChannelName(channelName);
            onClose!();
          }}
        >
          done
        </Button>
      </HStack>
    </Stack>
  );
};

export default EditChannel;
