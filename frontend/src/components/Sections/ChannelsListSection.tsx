import {Stack} from '@chakra-ui/react'
import ScrollableStack from '../ScrollableStack'
import { useContext, useEffect, useState } from 'react'
import { ChannelsContext } from '@/context/Contexts'
import ChannelField from '../ChatComponents/ChannelField' 
import FriendsListHeader from '../ChatComponents/FriendsListHeader'
interface ChannelsListProps {

}

const ChannelsListSection:React.FC<ChannelsListProps> = ({}) =>{

    const {Channels, setChannels} = useContext (ChannelsContext)
    const [channelsList, setChannelsList] = useState<Channel[]>([])

    useEffect (() => {
        setChannelsList(Channels!)
    }
    , [Channels])
    return (
        <Stack w={'100%'} h='100%' spacing={5}  justifyContent={'center'} alignItems={'center'}>
           <FriendsListHeader type='channels'  setChannelsList={setChannelsList}/>
            <ScrollableStack>
                {channelsList!.map((channel, index) => (
                    <ChannelField key={index} channel={channel} />
                ))}
            </ScrollableStack>
        </Stack>
    )
}

export default ChannelsListSection