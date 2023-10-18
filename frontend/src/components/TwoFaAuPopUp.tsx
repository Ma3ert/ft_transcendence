import React, { useEffect, useState } from "react";
import { PinInput, PinInputField, Wrap } from "@chakra-ui/react";
import {
  Input,
  Stack,
  useDisclosure,
  Button,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text
} from "@chakra-ui/react";

type Props = {};

const TwoFaAuPopUp = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [pin, setPin] = useState("");
  useEffect(() => {
    if (pin.length === 6)
    {
      console.log("its time to sent the")
      onClose()
    }
    console.log("pin: ", pin)
  }, [pin])
  return (
    <>
    <Button onClick={onOpen}>Open Modal</Button>
    <Modal closeOnOverlayClick={false} variant={"form"} isOpen={isOpen} onClose={onClose} size={"invite"}>
      <ModalOverlay />
      <ModalContent style={{ width: "480px", height: "280px" }}>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Stack align={"center"} spacing={"40px"} fontFamily={"visbyRound"}>
            <Text color={"#5B6171"} fontSize={"20px"}>Enter the PIN</Text>
            <Wrap spacing={"15px"} align={"center"} px={"auto"}>
                <PinInput focusBorderColor="#d9d9d9" onChange={(e) => (setPin(e))} >
                <PinInputField
                    borderRadius={"10px"}
                    boxSize={"50px"}
                    border={"0px"}
                    bg={"#1D222C"}
                    color={"#5B6171"}
                    />
                <PinInputField
                    borderRadius={"10px"}
                    boxSize={"50px"}
                    border={"0px"}
                    bg={"#1D222C"}
                    color={"#5B6171"}
                    />
                <PinInputField
                    borderRadius={"10px"}
                    boxSize={"50px"}
                    border={"0px"}
                    bg={"#1D222C"}
                    color={"#5B6171"}
                    />
                <PinInputField
                    borderRadius={"10px"}
                    boxSize={"50px"}
                    border={"0px"}
                    bg={"#1D222C"}
                    color={"#5B6171"}
                    />
                <PinInputField
                    borderRadius={"10px"}
                    boxSize={"50px"}
                    border={"0px"}
                    bg={"#1D222C"}
                    color={"#5B6171"}
                  />
                <PinInputField
                    borderRadius={"10px"}
                    boxSize={"50px"}
                    border={"0px"}
                    bg={"#1D222C"}
                    color={"#5B6171"}
                    />
                </PinInput>
            </Wrap>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  );
};

export default TwoFaAuPopUp;
