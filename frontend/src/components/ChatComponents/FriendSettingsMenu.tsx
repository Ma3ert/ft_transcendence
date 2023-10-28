import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaEllipsis } from "react-icons/fa6";
import { options } from "../../../contstants";
import useOptionsManager from "@/hooks/useOptionsManager";
import OptionModal from "./OptionModal";
import useActions from "@/hooks/useActions"

interface OptionsMenuProps {
  channel?: Channel;
  user?: User;
  member?:Member
  MembersList?: Member[];
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({
  user,
  member, 
  MembersList,
}) => {
  const { getChecker } = useOptionsManager(user!, member!, MembersList!);
  const {actions} = useActions (user!)
  return (
    <Menu>
      <MenuButton
        bg="transparent"
        color="#DC585B"
        _active={{}}
        _hover={{}}
        as={Button}
      >
        <Icon as={FaEllipsis} _hover={{ transform: "scale(1.1)" }} />
      </MenuButton>
      <MenuList bg="#181D25" zIndex={9999} borderRadius={"xl"} border="none">
        {options.map((setting, index) => {
          return (getChecker(setting.description)() &&
          (setting.modal == false ? (
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
                if (actions.get(setting.description) !== undefined) {
                  actions!.get(setting.description)!();
                }
              }}
            >
              {setting.description}
            </MenuItem>
          ) : (
           <OptionModal
              key={index}
              user={user!}
              setting={setting}
            />
        )))
        })}
      </MenuList>
    </Menu>
  );
};

export default OptionsMenu;
