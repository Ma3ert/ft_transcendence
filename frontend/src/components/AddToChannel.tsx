import { Input, Stack, useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, Wrap } from '@chakra-ui/react';
import React, { ReactNode } from 'react'
import ScrollableStack from './ScrollableStack';
import ButtonStack from './ButtonStack';

type Props = {
    users:ReactNode[];
}

const AddToChannel = ({users}: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
        <Button onClick={onOpen}>Open Modal</Button>
        <Modal variant={"default"} isOpen={isOpen} onClose={onClose} size={"invite"}>
            <ModalOverlay />
            <ModalContent style={{ width: "500px", height: "386px" }}>
                <ModalCloseButton/>
                <ModalBody>
                    <Wrap align={"end"} spacing={"20px"}>
                        <ScrollableStack width={280} height={270} items={users} spacing='10px'/>
                        <ButtonStack
                            buttons={["Select all", "Done"]}
                            onClick={[() => {}]}
                            style={["ghost", "secondary"]}
                            width='115px'
                            height='33px'
                            spaceBetween='10px'
                            fontSize='12px'
                        />
                    </Wrap>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
  )
}

export default AddToChannel