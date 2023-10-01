import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
} from "@chakra-ui/react";
import IconButton from "../IconButton";
import { FaEllipsis } from "react-icons/fa6";
import { globalUserOptions, friendOptions } from "../../../contstants";
import useUserOptions from "@/hooks/useOptions";
interface OptionsMenuProps {
  channel?: Channel;
  user?: User;
  type: "Friend" | "User";
  color?: string;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ user, type, color }) => {

  const {EnviteUser} = useUserOptions ()
  const options = new Map([
    ["Send friend request", EnviteUser],
  ]);
  const caseActions = new Map([
    [
      "Friend",
      () => {
        return friendOptions;
      },
    ],
    [
      "User",
      () => {
        return globalUserOptions;
      },
    ],
  ]);
  return (
    <Menu>
      <MenuButton bg="transparent" _active={{}} _hover={{}} as={Button}>
        <Icon as={FaEllipsis} _hover={{transform:'scale(1.1)'}}/>
      </MenuButton>
      <MenuList bg="#181D25" border="none" borderRadius={"xl"}>
        {caseActions!.get(type)!().map((setting, index) => (
          <MenuItem
            w="96%"
            borderRadius={"xl"}
            mx={"auto"}
            key={index}
            _hover={{
              background: "#252932",
            }}
            bg="#181D25"
            color={setting.type === "critical" ? "#DC585B" : "#5B6171"}
            onClick={() => {
              options.get(setting.description)!(user!);
            }}
          >
            {setting.description}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default OptionsMenu;
