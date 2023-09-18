import { Button, FormControl, HStack, Stack , Text, Input} from "@chakra-ui/react"
interface SetPasswordProps{}
const SetPassword:React.FC<SetPasswordProps> =  ({})=>{
    return (
        <Stack justifyContent={'center'} w='100%' h='100%' alignItems={'center'} spacing={4}>
                <Text fontSize='sm' fontWeight='bold' color='#5B6171'>
                    Protect this room with a password
                </Text>
                <FormControl w='100'>
                    <Input variant='default' placeholder='your password' w='95%' />
                </FormControl>
                <HStack w='100%' spacing={4} justifyContent='center' alignItems='center'>
                <Button  _hover={{opacity:0.8}} _active={{transform:'scale(1.1)'}} borderRadius={'xl'} bg="#1D222C" color='#5B6171' fontSize='sm'  px={6} py={3}>
                    Cancel
                </Button> 
                <Button  _hover={{opacity:0.8}} _active={{transform:'scale(1.1)'}} borderRadius={'xl'} bg="#D9D9D9" color='#DC585B' fontSize='sm'  px={6} py={3}>
                    Set password
                </Button>  
                </HStack> 
        </Stack>
    )

}

export default SetPassword;