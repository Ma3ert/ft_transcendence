
import { Stack } from "@chakra-ui/react"
import MessageBox from "./MessageBox"
import LayoutStyles from '../../Styles/modules/layout.module.scss'
import EnviteMessage from "./EnviteMessage"

interface MessageStackProps {
    messages:Message[]
}
const MessageStack:React.FC<MessageStackProps> = ({messages})=>{
   
    return (
        <Stack px={2} py={4}  maxHeight='100%'   spacing={2}  justify={'start'} alignItems={'start'} w='100%'   overflowY={'auto'} className={LayoutStyles.customScroll}>
            {messages.map((message,index)=>{
                if (message.EnviteMessage) {
                    return (
                        <EnviteMessage   Message={message} key={index}/>
                    )
                }
                return (
                    <MessageBox Message={message} key={index}/>
                )
            })}
        </Stack>
    )
}

export default MessageStack;