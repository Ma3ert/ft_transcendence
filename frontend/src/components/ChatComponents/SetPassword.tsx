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
                <Button variant={'modalCancel'}>
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