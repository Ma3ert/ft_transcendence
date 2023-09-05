
import { Stack } from "@chakra-ui/react"
import MessageBox from "./MessageBox"
interface MessageStackProps {
    messages:Message[]
}
const MessageStack:React.FC<MessageStackProps> = ({messages})=>{
    return (
        <Stack flex={1}  spacing={4} justify={'start'} alignItems={'start'} w='100%' maxH={'40vh'}  overflowY={'scroll'}>
            {messages.map((message,index)=>{
                return (
                    <MessageBox Message={message} key={index}/>
                )
            })}
        </Stack>
    )
}

export default MessageStack;