"use client";
import { useState } from "react";
import {
  Menu,
  MenuButton,
  Button,
  MenuItem,
  MenuList,
  Icon,
  HStack,
  Text,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { FaUserGroup } from "react-icons/fa6";
import {FaUserAlt} from 'react-icons/fa';
interface ChannelTogglerProps {}

const ChannelToggler: React.FC<ChannelTogglerProps> = () => {
  const [isChannel, setChannel] = useState(false);
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            _active={{}}
            _hover={{}}
            isActive={isOpen}
            as={Button}
            rightIcon={<BiChevronDown />}
            bg="transparent"
            color="#5B6171"
          >
            {
              <HStack alignItems={"center"} spacing={3}>
                <Icon
                  fontSize={"xl"}
                  as={isChannel ? FaUserGroup : FaUserAlt}
                />{" "}
                <Text>{isChannel ? "Channels" : "Private messages"}</Text>
              </HStack>
            }
          </MenuButton>
          <MenuList bg="#181D25" border="none">
            <MenuItem
              _hover={{
                background: "#252932",
              }}
              bg="#181D25"
              color={"#5B6171"}
              onClick={() => setChannel(true)}
            >
              Channels
            </MenuItem>
            <MenuItem
              _hover={{
                background: "#252932",
              }}
              bg="#181D25"
              color="#5B6171"
              onClick={() => setChannel(false)}
            >
              Private Messages
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default ChannelToggler;
