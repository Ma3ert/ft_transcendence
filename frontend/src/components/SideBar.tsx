"use client";
import { Input, Stack, useDisclosure, Button, Wrap, Avatar,
  Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalBody, ModalFooter, Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import IconButton from './IconButton'
import {AiFillHome} from "react-icons/ai"
import {BiSolidBell} from "react-icons/bi"
import {FaMedal} from "react-icons/fa"
import {FaUserGroup} from "react-icons/fa6"
import {IoMdSettings} from "react-icons/io"
import NotificationField from './NotificationField';
import NotificationCenter from './NotificationCenter';

interface Props {
  bodySetter?: React.Dispatch<React.SetStateAction<number>>
}

const SideBar:React.FC<Props> = ({bodySetter}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const size = "35px";
  return (
    // <Stack spacing={90} color={"#5B6171"}>
    <SimpleGrid minChildWidth={size} spacing={"40px"} margin={"auto"}>
      <IconButton onClick={()=>{bodySetter && bodySetter (0)}} icon={AiFillHome} size={size}/>
      <IconButton onClick={onOpen} icon={BiSolidBell} size={size}/>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent style={{ width: "555px", height: "420px" }}>
          <NotificationCenter/>
        </ModalContent>
        </Modal>
      <IconButton onClick={()=>{bodySetter && bodySetter (1)}} icon={FaMedal} size={size}/>
      <IconButton onClick={()=>{bodySetter && bodySetter (2)}} icon={FaUserGroup} size={size}/>
      <IconButton onClick={()=>{bodySetter && bodySetter (3)}} icon={IoMdSettings} size={size}/>
    </SimpleGrid>
    // </Stack>
  )
}

export default SideBar