import { useContext, useEffect, useState } from "react"
import ScrollableStack from "../ScrollableStack"
import {HStack, Stack, Button, Text, Avatar, Checkbox} from "@chakra-ui/react"
import { ChannelsContext } from "@/context/Contexts"
import useChannelSettingsManager  from "@/hooks/useChannelSettingsManager"
import { ModalWrapperContext } from "@/context/Contexts"

interface InviteToChannelsProps{
    user:User
}

const InviteToChannels:React.FC<InviteToChannelsProps> = ({user}) => {

    const {Channels} = useContext (ChannelsContext)
    const [selectedChannels, setSelectedChannels] = useState<Channel[]>([])
    const {sendChannelEnvite} = useChannelSettingsManager ()
    const {onClose} = useContext (ModalWrapperContext)

    const handleSelect = (channel:Channel) => {
        if (selectedChannels.includes(channel)){
            setSelectedChannels(selectedChannels.filter((ch) => ch !== channel))
        } else {
            setSelectedChannels([...selectedChannels, channel])
        }
    }

    const sendEnvites = () => {
        selectedChannels.forEach((channel) => {
            const envite:UserChannel = {
                channelid: channel.id,
                userid: user.id,
            }
            sendChannelEnvite (envite)
            console.log (`enviting to ${channel.name}`)
        })
    }

    useEffect(()=>{
        console.log(selectedChannels)
    },[selectedChannels])
    return (
        <Stack spacing={8} w="100%" h="100%" justifyContent={"center"} alignItems={"center"}>
            <Stack spacing={3} overflowY={'auto'} maxW={'100%'} w={'100%'} maxH={'40vh'}>
                {Channels!.map((channel, index) => (
                    <Button w='100%' px={4} py={2} variant={'field'} key={index}>
                    <HStack justifyContent={'space-between'} w={'100%'}>
                        <HStack spacing={3}>
                            <Avatar size={'sm'} src={channel.avatar} />
                            <Text >{channel.name}</Text>
                        </HStack>

                        <Checkbox variant={'default'} onChange={()=>handleSelect (channel)}/>
                    </HStack>  
                    </Button>
                ))
                }
            </Stack>

            <HStack spacing={4}>
                <Button onClick={()=> {
                    sendEnvites ()
                    onClose! ()
                }} variant='modalConfirm'>Envite</Button>
                <Button variant='modalCancel' onClick={onClose}>Cancel</Button>
            </HStack>
        </Stack>
    )
}

export default InviteToChannels