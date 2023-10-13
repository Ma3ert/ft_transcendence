import { Stack } from "@chakra-ui/react"
import ChannelMessageBox from "./ChannelMessageBox"
interface ChannelMessagesProps {
    messages: ChannelMessage[]
}

const ChannelMessages:React.FC<ChannelMessagesProps> = ({messages}) =>{
    return (
        <Stack  spacing={4}>
            {messages && messages.map((message, index) => (
                <ChannelMessageBox key={index} Message={message} />
            ))}
        </Stack>
    )
}

export default ChannelMessages;