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
import { FaUserAlt } from "react-icons/fa";
import { ChannelTypes } from "../../../contstants";
interface ChannelTogglerProps {}

const ChannelToggler: React.FC<ChannelTogglerProps> = () => {
  const [channelType, setChannel] = useState<string>('Private messages');

  const setChannelType = (channel: string) => setChannel (channel)
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
                  as={channelType === 'Private messages' ?   FaUserAlt : FaUserGroup}
                />{" "}
                <Text>{channelType}</Text>
              </HStack>
            }
          </MenuButton>
          <MenuList bg="#181D25" border="none" borderRadius='xl'>
            {ChannelTypes.map((channel, index) => (
              <MenuItem
                key={index}
                _hover={{
                  background: "#252932",
                }}
                bg="#181D25"
                color={"#5B6171"}
                onClick={() => setChannelType (channel)}
              >
                {channel}
              </MenuItem>
            ))}
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default ChannelToggler;
