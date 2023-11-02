import { Grid, GridItem } from "@chakra-ui/react";
import React, { useContext } from "react";
import SideBar from "../SideBar";
import { AppNavigationContext, UsersContext } from "@/context/Contexts";
import TabsWrapper from "../Wrappers/tabsWrapper";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Text
} from "@chakra-ui/react";
import EnviteMessage from "../ChatComponents/EnviteMessage";

interface MainSectionProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainSectionProps> = ({children}) => {
 
  const {isOpen, onOpen, onClose} = useContext (UsersContext)
  return (
    <Grid
      templateColumns={"auto 1fr"}
      w="100%"
      h="100%"
      // border="1px"
      // borderColor="blue"
    >
      <Modal closeOnOverlayClick={false} variant={"invite"} isOpen={isOpen!} onClose={onClose!} size={"invite"}>
        <ModalOverlay />
        <ModalContent style={{ width: "300px", height: "190px" }}>
          <ModalBody display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <EnviteMessage />
          </ModalBody>
        </ModalContent>
      </Modal>
      <GridItem w="100%" h="100%" 
      // border="1px" borderColor="yellow"
      >
        <SideBar/>
      </GridItem>
      <GridItem
        w="100%"
        h="100%"
        // border="1px"
        // borderColor="red"
        // justifyContent={"center"}
        alignItems="center"
      >
        <Grid templateRows={"10vh 60vh"} w="100%" h="100%">
          <GridItem>
            <TabsWrapper />
          </GridItem>
          <GridItem
            w="100%"
            h="100%"
            display={'flex'}
            justifyContent={"center"}
            alignItems="center"
            // border={'1px'}
            // borderColor={'red'}
          >
          {children}
          </GridItem>
        </Grid>
      </GridItem>
    </Grid>
  );
};

export default MainLayout;
