import { Button, FormControl, HStack, Stack , Text, Input} from "@chakra-ui/react"
import { useContext } from "react"
import { ModalWrapperContext } from "@/context/Contexts"




interface SetPasswordProps{}
const SetPassword:React.FC<SetPasswordProps> =  ({})=>{

    const {onClose} = useContext (ModalWrapperContext) 
    return (
        <Stack justifyContent={'center'} w='100%' h='100%' alignItems={'center'} spacing={12}>
                <Text fontSize='sm' fontWeight='bold' color='#5B6171'>
                    Protect this room with a password
                </Text>
                <FormControl w='100%'>
                    <Input variant='default' placeholder='your password' w='95%' fontSize='sm' _placeholder={{fontSize:'sm', color:'#5B6171'}} />
                </FormControl>
                <HStack w='100%' spacing={4} justifyContent='center' alignItems='center'>
                <Button variant={'modalCancel'} onClick={onClose}>
                    Cancel
                </Button> 
                <Button  variant={'modalConfirm'}  px={6} py={3}>
                    Set password
                </Button>  
                </HStack> 
        </Stack>
    )

}

export default SetPassword;