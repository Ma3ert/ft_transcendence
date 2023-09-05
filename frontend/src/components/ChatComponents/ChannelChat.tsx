
import { Stack } from "@chakra-ui/react";
import PrivateChatHeader from "./PrivateChatHeader";
import{ friendsList, messages} from "../../../contstants";
import MessageStack from "./MessageStack";
import ChatInputBox from "./ChatInputBox";

interface ChannelChatProps {

}
const ChannelChat:React.FC<ChannelChatProps> = ({})=>{
    return (<Stack borderRadius={'2xl'} bg='#1D222C' justify={'space-between'} alignItems={'center'} w='100%' h='100%' py={2}>
            <PrivateChatHeader Peer={friendsList[0]}/>
            <MessageStack  messages={messages}/>
            <ChatInputBox/>
        </Stack>)
}


export default ChannelChat;