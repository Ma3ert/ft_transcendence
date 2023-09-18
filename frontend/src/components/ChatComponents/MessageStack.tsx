
import { Stack } from "@chakra-ui/react"
import MessageBox from "./MessageBox"
import LayoutStyles from '../../Styles/modules/layout.module.scss'

interface MessageStackProps {
    messages:Message[]
}
const MessageStack:React.FC<MessageStackProps> = ({messages})=>{
    return (
        <Stack flex={1}  spacing={4} justify={'start'} alignItems={'start'} w='100%' maxH={'40vh'}  overflowY={'scroll'} className={LayoutStyles.customScroll}>
            {messages.map((message,index)=>{
                return (
                    <MessageBox Message={message} key={index}/>
                )
            })}
        </Stack>
    )
}

export default MessageStack;