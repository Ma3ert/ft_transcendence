import { Heading, Text , HStack, Stack, Button, Modal, ModalContent, ModalBody, ModalCloseButton, useDisclosure } from "@chakra-ui/react"

interface ConfirmationProps {
    actionDescription:string
    action?:any
    actionKeyword:string
}

const Confirmation:React.FC<ConfirmationProps> = ({actionDescription, actionKeyword}) => {
    return (
        <Stack spacing={6} justifyContent='center' alignItems='center' >
            <Text fontSize='md' color='#5B6171' fontWeight={'bold'}>
                are you sure you want to
                <Text fontSize='md' color='#DC585B' fontWeight={'bold'}>
                    {actionDescription} 
                </Text>
                ?
            </Text>
            <HStack spacing={5}>
                <Button _hover={{opacity:0.8}} _active={{transform:'scale(1.1)'}} borderRadius={'xl'} bg="#1D222C" color='#5B6171' fontSize='sm'  px={6} py={3}> cancel</Button>
                <Button _hover={{opacity:0.8}} _active={{transform:'scale(1.1)'}} borderRadius={'xl'} bg="#DC585B" color='white' fontSize='sm'  px={6} py={3}> {actionKeyword}</Button>
            </HStack>
        </Stack>
    )
}

interface LeaveConfirmationModalProps extends ConfirmationProps {
    buttonVariant?:string
    buttonValue?:string
}
const ConfirmationModal:React.FC<LeaveConfirmationModalProps> = ({buttonValue, buttonVariant, action, actionDescription, actionKeyword}) =>{
    const {isOpen, onOpen, onClose} = useDisclosure ()
    return (
        <>
        <Button variant={buttonVariant} px={4} fontSize='sm' onClick={onOpen}>
            {buttonValue}
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}  variant={'default'}>
            <ModalContent>
                <ModalCloseButton/>
                <ModalBody display={'flex'} justifyContent={'center'} alignItems='center' minH={'auto'}>
                    <Confirmation actionDescription={actionDescription} actionKeyword={actionKeyword} action={action}/>
                </ModalBody>
            </ModalContent>
        </Modal>
        </>
    )
}

export default ConfirmationModal