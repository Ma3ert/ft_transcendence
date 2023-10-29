import {
  useDisclosure,
  Modal,
  Button,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  Text,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { SlArrowRight } from "react-icons/sl";

interface CostumModalProps {
  value: string;
  children?: React.ReactNode;
  buttonVariant?: string;
}
const CostumModal: React.FC<CostumModalProps> = ({
  children,
  value,
  buttonVariant,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button variant={buttonVariant} onClick={onOpen}>
        <HStack justify={"space-between"} w={"100%"}>
          <Text fontFamily="visbyRound" fontSize={"sm"} color={"#5B6171"}>
            {value}
          </Text>
          {buttonVariant === "modal" && <Icon as={SlArrowRight} />}
        </HStack>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} variant="default">
        <ModalContent>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            justifyContent={"center"}
            alignItems="center"
            minH={"auto"}
          >
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CostumModal;
