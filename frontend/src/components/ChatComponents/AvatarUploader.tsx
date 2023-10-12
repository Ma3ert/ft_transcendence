import React from "react";
import { Box, Icon , Stack} from "@chakra-ui/react";
import { FaUserGroup } from "react-icons/fa6";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Input, Button } from "@chakra-ui/react";
import { useRef, useState } from "react";

interface AvatarUploaderProps {}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleButtonClick = () => {
    // Trigger the click event of the file input to open the file dialog
    fileInputRef.current?.click();
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
    console.log(file);
  };

  return (
    <Stack>
      <Button
        border="none"
        outline="none"
        bg="transparent"
        objectFit={"contain"}
        _hover={{}}
        _active={{}}
        _focus={{}}
        onClick={handleButtonClick}
      >
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
          <Icon as={FaUserGroup} w={16} h="auto" color={"#5B6171"} />
          <Icon
            as={SmallCloseIcon}
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
      </Button>
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
