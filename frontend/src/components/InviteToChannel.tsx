import { Input, Stack, useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import React, { ReactNode } from 'react'
import ScrollableStack from './ScrollableStack';

type Props = {
    users:ReactNode[];
}

const InviteToChannel = ({users}: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
        <Button onClick={onOpen}>Open Modal</Button>
        <Modal variant={"default"} isOpen={isOpen} onClose={onClose} size={"invite"}>
            <ModalOverlay />
            <ModalContent style={{ width: "362px", height: "460px" }}>
                <ModalCloseButton/>
                <ModalBody>
                    <Stack align={"center"} spacing={"28px"}>
                        <Input  p={0} variant={"default"} w={"315px"} h={"41px"} placeholder='Search for a friend'></Input>
                        <ScrollableStack width={290} height={270} items={users} spacing='10px'/>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
  )
}

export default InviteToChannel