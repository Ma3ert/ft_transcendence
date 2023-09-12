
import { Stack } from "@chakra-ui/react";
import PrivateChatHeader from "./PrivateChatHeader";
import{ friendsList, messages} from "../../../contstants";
import MessageStack from "./MessageStack";
import ChatInputBox from "./ChatInputBox";
import ChannelChatHeader from "./ChannelChatHeader";
interface ChannelChatProps {
    isPrivateChat: boolean
    Channel?: Channel
    Peer?: User
}
const ChannelChat:React.FC<ChannelChatProps> = ({isPrivateChat, Channel, Peer})=>{
    return (<Stack borderRadius={'2xl'} bg='#1D222C' justify={'space-between'} maxW={'6xl'} alignItems={'center'} w='100%' flex={1} py={2}>
            {isPrivateChat ? <PrivateChatHeader Peer={Peer!}/> : <ChannelChatHeader channel={Channel!}/>}
            <MessageStack  messages={messages}/>
            <ChatInputBox/>
        </Stack>)
}


export default ChannelChat;