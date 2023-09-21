import { Modal, ModalCloseButton, ModalContent, ModalBody, Heading, Button, ButtonGroup,  Highlight, Stack } from "@chakra-ui/react";

export const RegularModalWrapper: React.FC<RegularModalProps> = ({
    children,
    onOpen,
    onClose,
    isOpen,
  }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} variant='default'>
        <ModalContent>
          <ModalCloseButton />
          <ModalBody w='100%' h='100%' display='flex' justifyContent={'center'} alignItems='center'>{children}</ModalBody>
        </ModalContent>
      </Modal>
    );
  };
  
  export const ConfirmationModalWrapper: React.FC<ConfirmationModalProps> = ({
    onOpen,
    onClose,
    isOpen,
    actionDescription,
  }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} variant='default'>
        <ModalContent>
          <ModalCloseButton />
          <ModalBody w='100%' h='auto' display='flex' justifyContent={'center'} alignItems='center' minH={'auto'}>
           <Stack spacing={5} w='100%' h='100%' justifyContent='center' alignItems='center'>
           <Heading fontSize={"md"} color="#5B6171" mb={4}>
              <Highlight
                query={actionDescription}
                styles={{ fontSize: "inherit", color: "#DC585B" , bg:'#252932'}}
              >
              {`Are you sure you want to ${actionDescription}?`}
              </Highlight>
            </Heading>
            <ButtonGroup spacing={5}>
              <Button variant="modalCancel" onClick={onClose}>
                Cancel
              </Button>
              <Button variant={"modalConfirm"} onClick={onOpen}>
                Confirm
              </Button>
            </ButtonGroup>
           </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };