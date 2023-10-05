import { useContext, useState } from "react";
import {
  useDisclosure,
  Button,
  UseModalProps,
  Text,
  MenuItem,
} from "@chakra-ui/react";
import {
  RegularModalWrapper,
  ConfirmationModalWrapper,
} from "@/components/Wrappers/ModalWrappers";

interface useModalProps {
  type: ModalType;
  children?: React.ReactNode;
  actionDescription?: string;
  buttonValue?: JSX.Element;
  buttonVariant?: string;
  action?: () => void;
  variant?: string;
  isOption?: boolean;
}
export const ModalWrapper: React.FC<useModalProps> = ({
  type,
  children,
  actionDescription,
  buttonValue,
  buttonVariant,
  action,
  variant,
  isOption
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isOption ? (
        <MenuItem
          w="96%"
          borderRadius={"xl"}
          mx={"auto"}
          _hover={{
            background: "#252932",
          }}
          bg="#181D25"
          color={"#5B6171"}
          onClick={onOpen}
        >
          {" "}
          {buttonValue}{" "}
        </MenuItem>
      ) : (
        <Button onClick={onOpen} variant={buttonVariant || "secondary"}>
          {buttonValue || "confirm"}
        </Button>
      )}
      {type === "regular" ? (
        <RegularModalWrapper isOpen={isOpen} onClose={onClose} onOpen={onOpen} variant={variant}>
          {children}
        </RegularModalWrapper>
      ) : (
        <ConfirmationModalWrapper
          action={action}
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          actionDescription={actionDescription!}
        />
      )}
    </>
  );
};
