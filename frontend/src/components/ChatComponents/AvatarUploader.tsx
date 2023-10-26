import React from "react";
import { Box, Icon, Stack, Avatar, Text, HStack } from "@chakra-ui/react";
import { FaUserGroup } from "react-icons/fa6";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Input, Button } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import apiClient from "@/services/requestProcessor";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import useAvatarUpdater from "@/hooks/useAvatarUpdater";
import { CheckIcon, AddIcon } from "@chakra-ui/icons";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaPen } from "react-icons/fa";

interface AvatarUploaderProps {
  avatarPath?: string;
  setAvatarPath?: React.Dispatch<React.SetStateAction<string>>;
  channel?: Channel;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  setAvatarPath,
  channel,
  avatarPath,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const toast = useToast();
  const { updateAvatar } = useAvatarUpdater();

  const handleButtonClick = () => {
    // Trigger the click event of the file input to open the file dialog
    fileInputRef.current?.click();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
    //console.log(file);
  };

  const uploadAvatarMutation = useMutation({
    mutationFn: async (formData: any) =>
      await axios
        .post("http://e1r9p3.1337.ma:3000/chat/channels/avatar", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
    onSuccess: (res) => {
      if (channel) updateAvatar({ channel: channel!.id!, avatar: res.data });
      else setAvatarPath && setAvatarPath(res.data);
      toast({
        title: "Avatar uploaded successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (error) =>{} //console.log(error),
  });

  const handleUplaod = () => {
    const formData = new FormData();
    formData.append("file", file!);
    uploadAvatarMutation.mutate(formData);
  };
  return (
    <Stack>
      <Box
        position="relative"
        bg="#1D222C"
        borderRadius={"full"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        _hover={{ bg: "#181D25" }}
        objectFit="contain"
      >
        <Avatar
          src={`http://e1r9p3.1337.ma:3000/${
            channel ? channel!.avatar : avatarPath
          }`}
          size="2xl"
          bg="#1D222C"
        />
        <Button
          borderRadius={"full"}
          bg="#DC585B"
          w="20px"
          position="absolute"
          onClick={handleButtonClick}
          bottom="0"
          right="0"
          color="white"
          _hover={{}}
          _active={{}}
          _focus={{}}
        >
          <Icon as={channel || file ? FaPen : AddIcon} fontSize="md" />
        </Button>
      </Box>
      {file && (
        <Button variant="ghost" onClick={handleUplaod}>
          <HStack spacing={3}>
            <Text>Upload </Text>
            <Icon as={AiOutlineCloudUpload} />
          </HStack>
        </Button>
      )}
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleOnChange}
        display="none"
      />
    </Stack>
  );
};

export default AvatarUploader;
