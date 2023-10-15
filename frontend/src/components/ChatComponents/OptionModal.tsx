import useOptionsManager from "@/hooks/useOptionsManager";
import { ModalWrapper } from "../Wrappers/ModalWrapper";
import { useContext } from "react";
import {
  UsersContext,
  AppNavigationContext,
  ChatContext,
} from "@/context/Contexts";
import { Text } from "@chakra-ui/react";
interface OptionModalProps {
  user: User;
  setting: MenuOption;
  userIsBlocked?: boolean;
}

const OptionModal: React.FC<OptionModalProps> = ({
  user,
  setting,
  userIsBlocked,
}) => {
  const { loggedInUser, friendsList } = useContext(UsersContext);
  const { currentSection } = useContext(AppNavigationContext);
  const { chatType } = useContext(ChatContext);
  const { getChecker, modals, actions } = useOptionsManager(
    loggedInUser!,
    user,
    friendsList!,
    currentSection!,
    chatType!,
    userIsBlocked!
  );
  return (
    <>
      {setting.type === "critical" ? (
        <ModalWrapper
          buttonValue={<Text color={"#DC585B"}>{setting.description}</Text>}
          type="confirmation"
          isOption={true}
          action={actions.get(setting.description)!}
          actionDescription={setting.description}
        ></ModalWrapper>
      ) : (
        <ModalWrapper
          type="regular"
          isOption={true}
          buttonValue={<Text>{setting.description}</Text>}
        >
          {modals.get(setting.description) &&
            modals.get(setting.description)!(user!)}
        </ModalWrapper>
      )}
    </>
  );
};

export default OptionModal;
