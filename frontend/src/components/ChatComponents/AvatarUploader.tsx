import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { FaUserGroup } from "react-icons/fa6";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/react";

interface AvatarUploaderProps {}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({}) => {
    return (<>
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
      <Input type="file"  />
    </>)
}

export default AvatarUploader;