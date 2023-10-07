import { Stack, Input, Text, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fromZodError } from "zod-validation-error";
import { WarningIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";

interface InputWrapperProps {
  state: string;
  placeholder: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  scheme: any;
  submitted?: boolean;
  setSubmitted?: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputWrapper: React.FC<InputWrapperProps> = ({
  state,
  setState,
  scheme,
  placeholder,
  submitted,
  setSubmitted
}) => {

  useEffect (()=>{

  }, [submitted])
  return (
    <Stack spacing={3}>
      <Input
        onChange={(e) => {
          if (submitted) setSubmitted!(false)
          setState(e.target.value);
        }}
        variant="default"
        _placeholder={{ fontSize: "sm" }}
        placeholder={placeholder}
        w="100%"
      />
      {scheme.safeParse(state).success == true ? null : (
        submitted && (
          <HStack spacing={3} justify={'center'} alignItems={'center'}>
          <Icon color={'#DC585B'} as={WarningIcon} fontSize="18px" />
          <Text color="#DC585B" fontSize="sm" fontWeight="bold">
            {((state.length < 3)  ? "Value Too short" : 'Value Too long') }
          </Text>
        </HStack>)
      )}
    </Stack>
  );
};

export default InputWrapper;
