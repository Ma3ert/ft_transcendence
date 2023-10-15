import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  Heading,
  Button,
  ButtonGroup,
  Highlight,
  Stack,
  HStack

} from "@chakra-ui/react";

export const RegularModalWrapper: React.FC<RegularModalProps> = ({
  children,
  onOpen,
  onClose,
  isOpen,
  variant = "default",
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant={variant}>
      <ModalContent>
        <ModalCloseButton />
        <ModalBody
          w="100%"
          h="100%"
          display="flex"
          justifyContent={"center"}
          alignItems="center"
        >
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const ConfirmationModalWrapper: React.FC<ConfirmationModalProps> = ({
  onOpen,
  onClose,
  isOpen,
  actionDescription,
  action,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="default">
      <ModalContent>
        <ModalCloseButton />
        <ModalBody
          w="100%"
          h="auto"
          display="flex"
          justifyContent={"center"}
          alignItems="center"
          minH={"auto"}
        >
          <Stack
            spacing={5}
            w="100%"
            h="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Heading fontSize={"md"} color="#5B6171" mb={4}>
              <Highlight
                query={actionDescription}
                styles={{
                  fontSize: "inherit",
                  color: "#DC585B",
                  bg: "#252932",
                }}
              >
                {`Are you sure you want to ${actionDescription}?`}
              </Highlight>
            </Heading>
            <ButtonGroup spacing={5}>
              <Button variant="modalCancel" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant={"modalConfirm"}
                onClick={() => {
                  action!();
                  onClose();
                }}
              >
                Confirm
              </Button>
            </ButtonGroup>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

interface ActionModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  action: () => void;
  buttonText: string;
}

const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onOpen,
  onClose,
  action,
  buttonText
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="default">
      <ModalContent>
        <ModalCloseButton />
        <ModalBody
          w="100%"
          h="100%"
          display="flex"
          justifyContent={"center"}
          alignItems="center"
          minH={"auto"}
        >

          <HStack spacing={4}>

            <Button variant={"modalConfirm"} onClick={()=>{
              action!()
              onClose()
            }}>
              {buttonText}
            </Button>
            <Button variant={"modalCancel"} onClick={onClose}>Cancel</Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
