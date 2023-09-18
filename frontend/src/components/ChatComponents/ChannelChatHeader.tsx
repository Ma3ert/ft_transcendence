import { HStack , Stack, Text , Box, Avatar} from '@chakra-ui/react'
interface ChannelHeaderProps {
    channel:Channel
}
const ChannelHeader:React.FC<ChannelHeaderProps> = ({channel}) => {
    return (
        <HStack borderRadius={'2xl'} bg='#252932' justify={'space-between'} alignItems={'center'} w='98%' p={4} >
            <Stack spacing={2}>
                <HStack spacing={3}>
                <Avatar  name={channel?.name} size='sm'/>
                <Text color='#5B6171' fontSize='sm'>
                    {channel?.name}
                </Text>
                {channel?.isPrivate && <Text fontSize='xs' color='#5B6171'>(Private)</Text>}
                </HStack>
                <Text color='#5B6171' fontSize='xs' fontWeight={'bold'}>
                    {channel?.membersCount} members
                </Text>
            </Stack>
        </HStack>
    )
}

export default ChannelHeader