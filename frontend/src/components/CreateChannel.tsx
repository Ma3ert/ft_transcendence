import { Input, Stack, useDisclosure, Button, Wrap, Logo, Avatar,
        Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import React, { ReactNode } from 'react'
import ScrollableStack from './ScrollableStack';
import ButtonStack from './ButtonStack';

type Props = {
    users:ReactNode[];
}

const CreateChannel = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
        <Button onClick={onOpen}>Open Modal</Button>
        <Modal variant={"form"} isOpen={isOpen} onClose={onClose} size={"invite"}>
            <ModalOverlay />
            <ModalContent style={{ width: "555px", height: "420px" }}>
                <ModalCloseButton/>
                <ModalBody>
                    <Stack align={"center"} spacing={"40px"}>
                        <Avatar boxSize={"85px"}></Avatar>
                        <Stack align={"center"} spacing={"20px"}>
                            <Input 
                                variant={"default"}
                                w={"350px"}
                                h={"55px"}
                                placeholder="channel's name"/>
                            <Button fontSize={"15px"} variant={"ghost"} >Add member</Button>
                            <Button w={"148px"} h={"43px"} fontSize={"15px"} variant={"secondary"} >Done</Button>
                        </Stack>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    </>
  )
}

export default CreateChannel