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
} from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import { SlArrowRight } from "react-icons/sl";
import { ModalWrapperContext } from "@/context/Contexts";
import { useContext } from "react";
import useChannelSettingsUpdater from "@/hooks/useChannelSettingsUpdater";
import CostumSwitcher from "@/components/ChatComponents/CostumSwitcher";
import {HiMiniUserGroup} from 'react-icons/hi2' 


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
  

  const [isOpen, setIsOpen] = useState (false)
  const onOpen = () => setIsOpen (true)
  const onClose = () => setIsOpen (false)

  return (
     
      <Menu isOpen={isOpen} >
        <MenuButton
          onClick={onOpen}
          as={Button}
          variant="largeGhost"
          w="100%"
          justifyContent={"space-between"}
          alignItems="center">
        <HStack w="100%" h="100%" justifyContent="space-between">
          <Text>Visibility</Text>
          <Icon as={SlArrowRight} />
        </HStack>
          </MenuButton>
        <MenuList bg="#181D25" border="none">
          <MenuItem bg="transparent" border="none">
            <HStack w='100%' px={2} justify={"space-between"} alignItems={"center"}>
              <Text color={"#5B6171"} fontSize="sm" fontWeight={"bold"}>
                Private Channel
              </Text>
              <CostumSwitcher />
            </HStack>
          </MenuItem>
          <MenuItem bg="transparent" border="none">
            <HStack w='100%' spacing={5} py={2}>
              <Button variant='ghost' color={"#DC585B"} onClick={onClose}>cancel</Button>
              <Button variant='ghost' color={"#5B6171"} onClick={()=>{
                onClose ()
              }}>done</Button>
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

  return (
    <Stack justifyContent={"center"} alignItems={"center"} spacing={6}>
      <Box position={"relative"} w="50%">
        {channel.avatar ? <Avatar w='100%' h="auto" src={channel.avatar} /> : (
          <Box
          position="relative"
          bg="#1D222C"
          borderRadius={"full"}
          p={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
          _hover={{ bg: "#181D25" }}
        >
          <Icon as={HiMiniUserGroup} w={20} h="auto" color={"#5B6171"} />
          <Icon
            as={FaPen}
            position="absolute"
            bottom="12px"
            right="12px"
            fontStyle="bold"
            fontWeight="black"
            fontSize="6px"
            boxSize="20px"
            borderRadius="full"
            bg="#DC585B"
            color="#252932"
            _active={{ transform: "scale(1.1)" }}
            _hover={{ opacity: 0.8 }}
          />
        </Box>
        )}
        <Button
          w="40px"
          h="40px"
          position={"absolute"}
          bottom={2}
          right={0}
          color="white"
          display="flex"
          justifyContent="center"
          alignItems={"center"}
          bg="#DC585B"
          borderRadius="full"
          border={"none"}
        >
          <Icon as={FaPen} fontSize="18px" />
        </Button>
      </Box>
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
              <Text color={"#5B6171"} fontSize={"sm"} fontWeight={"bold"}>
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
              <Text color={"#DC585B"} fontSize={"sm"} fontWeight={"bold"}>
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
