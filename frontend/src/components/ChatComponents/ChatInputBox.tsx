
import { Button, FormControl, HStack, Input } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { TbArrowBigRightFilled } from "react-icons/tb"

interface ChatInputBoxProps {}
const ChatInputBox:React.FC<ChatInputBoxProps> =  ({})=>{
    return (
        <HStack borderRadius={'29px'} bg='#252932' justify={'space-between'} alignItems={'center'} w='98%' px={4} py={2}>
            <FormControl w='70%'>
                <Input type="text" bg={'transparent'} color='white' _active={{outline:'none', border:'none', boxShadow:'none'}} _focus={{outline:'none', border:'none', boxShadow:'none'}}  placeholder="Type a message ..." outline='none' border='none' w='100%' p={2} _placeholder={{color:'#5B6171'}} />
            </FormControl>
            <Button bg='#5B6171' color='#1D222C' borderRadius={'50%'} _hover={{opacity:0.8}} _active={{background:'#fff', color:'#DC585B'}}  p={2} fontSize={'sm'} fontWeight={'bold'}>
                <Icon as={TbArrowBigRightFilled} />
            </Button>
            <Button bg='#DC585B' color='#fff' borderRadius={'29px'} _hover={{opacity:0.8}} _active={{background:'#fff', color:'#DC585B'}}  w='25%' h='40px' fontSize={'sm'} fontWeight={'bold'}>Envite</Button>
        </HStack>
    )
}

export default ChatInputBox;