import { Input, Stack } from "@chakra-ui/react";

interface Props {
  placeholder: string[];
  style: string;
  width: string[];
  height: string[];
  spaceBetween: string;
  state: boolean[];
}

const InputStack = (props: Props) => {
  return (
      <Stack spacing={props.spaceBetween} mx={0} px={0}>
        {props.placeholder.map((placeholder, index) => (
          <Input
            variant={props.style}
            w={props.width[index]}
            h={props.height[index]}
            placeholder={placeholder}
            isDisabled={props.state[index]}
          ></Input>
        ))}
      </Stack>
  );
};

export default InputStack;
