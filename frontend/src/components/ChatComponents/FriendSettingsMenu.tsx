import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Icon,
  Text,
} from "@chakra-ui/react";
import IconButton from "../IconButton";
import { FaEllipsis } from "react-icons/fa6";
import useUserOptions from "@/hooks/useOptions";
import { ModalWrapper } from "../Wrappers/ModalWrapper";
import UserProfileModal from "./UserProfileModal";
import InviteToChannels from "./InviteToChannels";
import { options } from "../../../contstants";
import useOptionsManager from "@/hooks/useOptionsManager";
import OptionModal from "./OptionModal";
import {
  UsersContext,
  AppNavigationContext,
  ChatContext,
} from "@/context/Contexts";
import { useContext } from "react";
interface OptionsMenuProps {
  channel?: Channel;
  user?: User;
  loggedInUserRole?: string;
  userRole?: string;
  color?: string;
  userIsBlocked?: boolean;
  member?:Member
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({
  user,
  loggedInUserRole,
  userRole,
  color,
  userIsBlocked,
  member, 
  channel
}) => {
  const { loggedInUser, friendsList } = useContext(UsersContext);
  const { currentSection } = useContext(AppNavigationContext);
  const { chatType } = useContext(ChatContext);
  const { getChecker, modals, actions } = useOptionsManager(
    loggedInUser!,
    user!,
    friendsList!,
    currentSection!,
    chatType!,
    userIsBlocked!,
  );
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
        {options?.map(
          (setting, index) =>
            getChecker(setting.description)(
              loggedInUserRole!,
              member!
            ) &&
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
                userIsBlocked={userIsBlocked!}
              />
            ))
        )}
      </MenuList>
    </Menu>
  );
};

export default OptionsMenu;
