import { useContext, useState } from "react";
import { useDisclosure, Button, UseModalProps } from "@chakra-ui/react";
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
export const ModalWrapper:React.FC<useModalProps> = ({type, children , actionDescription, buttonValue, buttonVariant}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} variant={buttonVariant || 'secondary'}>{buttonValue || 'confirm'}</Button>
      {type === "regular" ? (
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
