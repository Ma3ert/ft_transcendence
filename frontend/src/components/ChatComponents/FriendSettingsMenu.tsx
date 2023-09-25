import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import IconButton from "../IconButton";
import { FaEllipsis } from "react-icons/fa6";
import { UserSettings } from "../../../contstants";
import ConfirmationModal from "./ConfirmationModal";
import MenuModal from "./MenuModal";
import CostumModal from "./CostumModal";
import UserProfileModal from "./UserProfileModal";
interface FriendSettingsMenuProps {
  user: User;
}

const conditoinalRender = (setting: friendAction, user:User) => {
  if (setting.important)
    return (
      <MenuModal
        value={setting.actionName}
        componentName={setting.actionName}
    
      />
    );
  else if (setting.modal)
    return (
      <CostumModal value={setting.actionName}buttonVariant="menuItem" >
        <UserProfileModal user={user} />
      </CostumModal>
    );
  else return <Button variant="menuItem">{setting.actionName}</Button>;
};

const FriendSettingsMenu:React.FC<FriendSettingsMenuProps> = ({user}) => {
  return (
    <Menu>
      <MenuButton bg="transparent" _active={{}} _hover={{}} as={Button}>
        <IconButton icon={FaEllipsis} color="#5B6171" size="25px" />
      </MenuButton>
      <MenuList bg="#181D25" border="none" borderRadius={"xl"}>
        {UserSettings.map((setting, index) => (
          <MenuItem
            w="96%"
            borderRadius={"xl"}
            mx={"auto"}
            key={index}
            _hover={{
              background: "#252932",
            }}
            bg="#181D25"
            color={setting.important ? "#DC585B" : "#5B6171"}
          >
            {conditoinalRender(setting, user)}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default FriendSettingsMenu;
