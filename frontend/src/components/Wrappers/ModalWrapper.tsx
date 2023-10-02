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
}
export const ModalWrapper: React.FC<useModalProps> = ({
  type,
  children,
  actionDescription,
  buttonValue,
  buttonVariant,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {type === "options" ? (
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
      {type === "regular" || type === "options" ? (
        <RegularModalWrapper isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
          {children}
        </RegularModalWrapper>
      ) : (
        <ConfirmationModalWrapper
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          actionDescription={actionDescription!}
        />
      )}
    </>
  );
};
