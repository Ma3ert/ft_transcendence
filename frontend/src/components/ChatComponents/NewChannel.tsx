import { Icon, Stack, Box, FormControl, Input , Button, Text, HStack, Modal, ModalContent, ModalCloseButton, ModalBody, useDisclosure} from "@chakra-ui/react";
import { FaUserGroup } from "react-icons/fa6";
import { SlArrowRight } from "react-icons/sl";
import {HiOutlineX} from "react-icons/hi";


interface NewChannelProps {}
const NewChannel: React.FC<NewChannelProps> = ({}) => {
  return (
    <Stack spacing={6} justify={"center"} alignItems={"center"}>
      <Box position="relative" bg='#1D222C' borderRadius={'full'} p={8} display='flex' justifyContent='center' alignItems='center'>
        <Icon as={FaUserGroup} w={16} h='auto' color={'#5B6171'} />
        <Icon
          as={HiOutlineX}
          position="absolute"
          bottom="12px"
          right="12px"
          fontStyle="bold"
          fontWeight="black"
          fontSize="6px"
          boxSize="20px"
          borderRadius="full"
          bg="#DC585B"
          color="#252932"
          _active={{ transform: "scale(1.1)" }}
          _hover={{ opacity: 0.8 }}
        />
      </Box>
      <FormControl w='100%' display={'flex'} flexDir={'column'} justifyContent={'center'} alignItems='center'>
        <Input variant='default' placeholder="channel's name" w='70%' />
        <Button variant='ghost' p={6}>
            <HStack spacing={4}>
                <Text fontSize='sm' color='#5B6171' >
                    Add member 
                </Text>
                <Icon as={SlArrowRight} color={'#5B6171'} size='sm' />
            </HStack>
        </Button>
      </FormControl>

      <Button variant='secondary' px={6} borderRadius={'xl'} fontSize='sm'>
        done
      </Button>
    </Stack>
  );
};

interface NewChannelModalProps {}

const NewChannelModal:React.FC<NewChannelModalProps> = ({})=>{
    const {isOpen, onClose, onOpen} = useDisclosure ()
    return (
       <>
        <Button variant="secondary" px={4} fontSize={'sm'} onClick={onOpen}>
          create a channel
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}  variant='default'>
            <ModalContent>
                <ModalCloseButton/>
                <ModalBody>
                    <NewChannel />
                </ModalBody>
            </ModalContent>
        </Modal>
       </>
    )
}

export default NewChannelModal;
