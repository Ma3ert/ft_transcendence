import {Stack} from '@chakra-ui/react'
import ScrollableStack from '../ScrollableStack'
import { useContext } from 'react'
import { ChannelsContext } from '@/context/Contexts'
import ChannelField from '../ChatComponents/ChannelField' 
interface ChannelsListProps {

}

const ChannelsListSection:React.FC<ChannelsListProps> = ({}) =>{

    const {Channels} = useContext (ChannelsContext)
    return (
        <Stack w={'100%'} h='100%'>
            <ScrollableStack>
                {Channels!.map((channel, index) => (
                    <ChannelField key={index} channel={channel} />
                ))}
            </ScrollableStack>
        </Stack>
    )
}

export default ChannelsListSection