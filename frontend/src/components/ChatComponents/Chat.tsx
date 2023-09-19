import { Grid, GridItem } from '@chakra-ui/layout';
import { friendsList,  Channels } from '../../../contstants';
import ChatBox from './chatBox';
import ChatNavigation from './ChatNavigation';
import ChannelSettings from './ChannelSettings';
interface ChatProps {

}
const Chat:React.FC<ChatProps> = ({}) =>{
    return (
        <Grid templateColumns={{sm:'10% 80%',lg:'20% 60% 20%'}} w='100%' h='100%' mx='auto' justifyContent='center' alignItems='center'>
        <GridItem border={'1px'} borderColor={'green'} justifyContent='center' alignItems='center' h='100%'>
          <ChatNavigation isForChannel={false} friends={friendsList} channels={Channels} />
        </GridItem>
        <GridItem border={'1px'} borderColor={'green'} justifyContent='center' alignItems='center' w={'100%'} h='100%'>
          <ChatBox isPrivateChat={true} Peer={friendsList[0]} /> 
        </GridItem>
        <GridItem  border={'1px'} borderColor={'green'}  justifyContent='center' alignItems='center' w={'100%'} h='100%'>
          <ChannelSettings />                                         
        </GridItem>
    </Grid>
    )
}
export default Chat