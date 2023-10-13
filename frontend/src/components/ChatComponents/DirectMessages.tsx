import { Stack } from "@chakra-ui/react"
import React from "react"
import MessageBox from "./MessageBox"
interface DirectMessagesProps {
    messages: DirectMessage[]
}
const DirectMessages:React.FC<DirectMessagesProps> = ({messages}) => {
    return (
        <Stack spacing={4}>
            {messages && messages.map((message, index) => (
                <MessageBox key={index} Message={message} />
            ))}
        </Stack>
    )
}

export default DirectMessages;