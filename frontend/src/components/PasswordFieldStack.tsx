import { Stack, Input, InputGroup, InputRightElement, Button, Center } from '@chakra-ui/react'
import React from 'react'
import IconButton from './IconButton';
import {HiEye} from "react-icons/hi"
import {HiEyeSlash} from "react-icons/hi2"

type Props = {
    variant: string;
    w: string;
    h: string;
    placeholder: string[];
    spaceBetween: string;
}

const PassowrdFieldStack = ({variant, w, h, placeholder, spaceBetween}: Props) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  return (
    <Stack spacing={spaceBetween} align={"center"}>
        {placeholder.map((placeholder) =>(
            <InputGroup>
                <Input
                w={w} h={h}
                variant={variant}
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder={placeholder}
                />
                <InputRightElement width='4.5rem' marginTop={"9px"}>
                {show ? <IconButton icon={HiEye} size='22px' onClick={handleClick}></IconButton> 
                : <IconButton icon={HiEyeSlash} size='22px' onClick={handleClick}></IconButton>}
                </InputRightElement>
            </InputGroup>
        ))}
    </Stack>
  )
}

export default PassowrdFieldStack