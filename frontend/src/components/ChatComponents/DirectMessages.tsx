import { Stack } from "@chakra-ui/react"
import React, {useContext} from "react"
import MessageBox from "./MessageBox"
import EnviteMessage from "./EnviteMessage"
import { ChatContext } from "../../context/Contexts"
interface DirectMessagesProps {
    messages: DirectMessage[]
}
const DirectMessages:React.FC<DirectMessagesProps> = ({messages}) => {
    const {joinGameStatus} = useContext (ChatContext)
    return (
        <Stack  w='100%' h='100%'  spacing={4} >
            {messages && messages.map((message, index) => (
                <MessageBox key={index} Message={message} />
            ))}
            {joinGameStatus && <EnviteMessage />}
        </Stack>
    )
}

export default DirectMessages;