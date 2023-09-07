import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import IconButton from "../IconButton";
import { FaEllipsis } from "react-icons/fa6";
import { UserSettings } from "../../../contstants";
interface FriendSettingsMenuProps {}

const FriendSettingsMenu = (props: FriendSettingsMenuProps) => {
  return (
    <Menu>
      <MenuButton bg='transparent' _active={{}} _hover={{}} as={Button}>
        <IconButton icon={FaEllipsis} color="#5B6171" size="25px" />
      </MenuButton>
      <MenuList bg="#181D25" border="none" borderRadius={"xl"}>
        {UserSettings.map((setting, index) => (
          <MenuItem
            key={index}
            _hover={{
              background: "#252932",
            }}
            bg="#181D25"
            color={setting.important ? '#DC585B' : '#5B6171'}
          >
            {setting.actionName}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default FriendSettingsMenu;