import { ModalWrapper } from "../Wrappers/ModalWrapper";
import { Text } from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import useOptionModals from "@/hooks/useOptionModals";
import useActions from "@/hooks/useActions";
interface OptionModalProps {
  user: User;
  setting: MenuOption;
}

const OptionModal: React.FC<OptionModalProps> = ({ user, setting }) => {
  const { modals } = useOptionModals(user);
  const { actions } = useActions(user!);
  return (
    <>
      {setting.type === "critical" ? (
        <ModalWrapper
          buttonValue={
            <Text fontFamily="visbyRound" color={"#DC585B"}>
              {setting.description}
            </Text>
          }
          type="confirmation"
          isOption={true}
          action={actions.get(setting.description)!}
          actionDescription={setting.description}
        ></ModalWrapper>
      ) : (
        <ModalWrapper
          type="regular"
          variant={setting.modalType}
          isOption={true}
          buttonValue={
            <Text fontFamily="visbyRound">{setting.description}</Text>
          }
        >
          {modals.get(setting.description) &&
            modals.get(setting.description)!(user!)}
        </ModalWrapper>
      )}
    </>
  );
};

export default OptionModal;
