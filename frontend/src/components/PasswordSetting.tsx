import { Stack, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import React from 'react'
import PassowrdFieldStack from './PasswordFieldStack'

type Props = {}

const PasswordSetting = (props: Props) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  return (
    <Stack alignItems="center" justifyContent="center" w={"468px"} h={"580px"} bg={"#1D222C"} align={'center'} spacing={"50px"} borderRadius={"20px"}>
      <PassowrdFieldStack
        variant='secondary'
        w='366px'
        h='57px'
        placeholder={["Old password", "New Password", "Confirm password"]}
        spaceBetween="48px"
        />
      <Button 
          variant={"secondary"}
          width={"160px"}
          height={"50px"}
          fontSize={"17px"}
        >confirm</Button>
    </Stack>
  )
}

export default PasswordSetting