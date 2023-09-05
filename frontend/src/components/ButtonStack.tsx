"use client";
import { Text, Button, Wrap, Stack, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  buttons: string[];
  onClick: (() => void)[];
  style: string[];
  width: string;
  height: string;
  spaceBetween: string;
  Icons?: ReactNode[];
  fontSize?: string;
}

const ButtonStack = (props: Props) => {
  return (
    <>
      <Stack spacing={props.spaceBetween} mx={0} px={0}>
        {props.buttons.map((button, index) => (
          <Button
            key={index}
            onClick={props.onClick[index]}
            variant={props.style[index]}
            w={props.width}
            h={props.height}
            textAlign="center"
            fontSize={"20px"}
          >
            <Flex alignItems="center" justifyContent="center">
              <Wrap align="center" spacingX="20px">
                <Text fontSize={props.fontSize ? props.fontSize : "20px"}>
                  {button}
                </Text>
                {!(props.Icons === undefined) && props.Icons[index]}
              </Wrap>
            </Flex>
          </Button>
        ))}
      </Stack>
    </>
  );
};

export default ButtonStack;
