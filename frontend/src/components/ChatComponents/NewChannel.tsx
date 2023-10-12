import {
  Icon,
  Stack,
  Box,
  FormControl,
  Input,
  Button,
  Text,
  HStack,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Checkbox,
} from "@chakra-ui/react";
import { FaUserGroup } from "react-icons/fa6";
import { SlArrowRight } from "react-icons/sl";
import { HiOutlineX } from "react-icons/hi";
import { useState } from "react";
import { LockIcon, ViewOffIcon, SmallCloseIcon } from "@chakra-ui/icons";
import CostumCheckBox from "./CostumCheckBox";
import { useEffect } from "react";
import { z } from "zod";
import InputWrapper from "../Wrappers/InputWrapper";
import useChannelManager from "@/hooks/useChannelManager";
import { ModalWrapperContext } from "@/context/Contexts";
import { useContext } from "react";
import AvatarUploader from "./AvatarUploader";

interface NewChannelProps {}



const NewChannel: React.FC<NewChannelProps> = ({}) => {
  const [isProtected, setIsProtected] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelPassword, setChannelPassword] = useState("");
  const channelNameSchema = z.string().min(3).max(20).refine((val) => val !== "");
  const passwordSchema = z.string().min(7).max(20).refine((val) => val !== "");
  const channelManager = useChannelManager();
  const {onClose} = useContext (ModalWrapperContext)
  const [submitted, setSubmitted] = useState(false);
  const [avatarPath, setAvatarPath] = useState<string>('');


  const createChannel = (channelName:string, channelType:string, channelPassword?:string, channelAvatar?:string) => {
    if (channelPassword)
      channelManager.createChannel(channelName, channelType, channelPassword)
    else
      channelManager.createChannel(channelName, channelType)
    onClose!()
  }
  return (
    <Stack spacing={6} justify={"center"} alignItems={"center"}>
      <AvatarUploader setAvatarPath={setAvatarPath} avatarPath={avatarPath} />
      <FormControl
        w="100%"
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems="center"
      >
        <Stack w="100%" spacing={6} justify={"center"} alignItems="center">
          <InputWrapper
            scheme={channelNameSchema}
            state={channelName}
            setState={setChannelName}
            placeholder="channel's name"
            submitted={submitted}
            setSubmitted={setSubmitted}
          />
          <HStack w="85%" justifyContent="center" spacing={8} alignItems="center">
            <HStack spacing={3}>
              <Text color="#5B6171" fontSize="sm" fontWeight="bold">
                Private
              </Text>
              <CostumCheckBox
                isChecked={isPrivate}
                action={() => {
                  setIsPrivate(!isPrivate);
                  setIsProtected(false);
                }}
                icon={ViewOffIcon}
              />
            </HStack>
            <HStack spacing={3}>
              <Text color="#5B6171" fontSize="sm" fontWeight="bold">
                Protected
              </Text>
              <CostumCheckBox
                isChecked={isProtected}
                action={() => {
                  setIsProtected(!isProtected);
                  setIsPrivate(false);
                }}
                icon={LockIcon}
              />
            </HStack>
          </HStack>
          {isProtected && (
            <InputWrapper
            state={channelPassword}
            setState={setChannelPassword}
            scheme={passwordSchema}
            submitted={submitted}
            setSubmitted={setSubmitted}
            placeholder="channel's password"
            />
          )}
        </Stack>
      </FormControl>

      <Button variant="secondary" px={6} borderRadius={"xl"} fontSize="sm" onClick={()=>{
        setSubmitted(true)
        if (channelNameSchema.safeParse(channelName).success)
        {
          if (isPrivate) {
            createChannel (channelName, "PRIVATE")
          }
          else if (isProtected) {
            if (passwordSchema.safeParse(channelPassword).success)
              createChannel (channelName, "PROTECTED", channelPassword)
          }
          else {
            createChannel (channelName, "PUBLIC")
          }
        }
      }}>
        done
      </Button>
    </Stack>
  );
};

export default NewChannel;
