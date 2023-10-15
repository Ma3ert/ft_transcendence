import { useState, useContext } from "react"
import { ModalWrapper } from "../Wrappers/ModalWrapper"
import useChannelSettingsManager from "@/hooks/useChannelSettingsManager"
import { CheckIcon } from "@chakra-ui/icons"
import { Button, Input, Stack, HStack, Icon, Heading } from "@chakra-ui/react"
import { ModalWrapperContext } from "@/context/Contexts"

interface AcceptProtectedChannelProps {
    envite:GlobalEnvite
}
export const AcceptProtectedChannel:React.FC<AcceptProtectedChannelProps> = ({envite}) => {

    

    return (<ModalWrapper
        type="regular"
        buttonValue={
            <Icon as={CheckIcon} fontSize={'20px'} _hover={{transform:'scale(1.1)'}}/>
        }
        buttonVariant="modalIcon"
        variant="default"
        isOption={false}

    >
        <ChannelPasswordModal envite={envite}/>
    </ModalWrapper>)
}

interface ChannelPasswordModalProps {
    envite:GlobalEnvite
}
const ChannelPasswordModal:React.FC<ChannelPasswordModalProps> = ({envite}) => {


    const {acceptProtectedEnvite, declineChannelEnvite} = useChannelSettingsManager()
    const [channelPassword, setChannelPassword] = useState<string>('')
    const {onClose} = useContext (ModalWrapperContext)

return (<Stack justifyContent='center' alignItems='center' spacing={10}>

    <Heading fontSize={'lg'} color='#DC585B'>This channel is protected</Heading>
    <Input 
        variant='default'
        _placeholder={{fontSize:'sm'}}
        placeholder="Enter the password"
        type="password"
        fontSize={'sm'}
        value={channelPassword}
        onChange={(e)=>setChannelPassword(e.target.value)}
    />
    <HStack spacing={4}>
        <Button variant='modalCancel'onClick={onClose}>Cancel</Button>
        <Button variant='modalConfirm'onClick={()=>{
             if(envite.isChannelEnvite){
                const res:UserChannel = {
                  channelid: envite.channel?.id,
                  userid: envite.senderId,
                  password: channelPassword
                }
                acceptProtectedEnvite(res)
                onClose! ()
              }
        }}>done</Button>
    </HStack>
</Stack>)
}