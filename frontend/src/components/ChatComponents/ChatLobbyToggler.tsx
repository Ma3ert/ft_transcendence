'use client';                           
import { Button, HStack } from "@chakra-ui/react";
import  { useState } from "react";
import {CHAT, LOBBY} from '../../../contstants';
interface ChatLobbyTogglerProps {
    action?: (open:boolean) => void;
}

interface TgglerButtonProps {
    value: string;
    isOpen: boolean;
}

const TogglerButton:React.FC<TgglerButtonProps> = ({value, isOpen, })=>{
    return (<Button  borderRadius={'2xl'} _hover={{
        opacity: 0.8,
    }}  w='50%' h='100%'color={isOpen ? '#1D222C' : '#5B6171'}   bg={isOpen ? '#5B6171' : 'transparent'}>
        {value}
        </Button>)
}


const ChatLobbyToggler:React.FC<ChatLobbyTogglerProps> = ({action})=>{
    const [isOpen, setIsOpen] = useState(false);
    return (<HStack maxWidth={'3xl'} w={{base:'300px', sm:'120px', md:'160px', lg:'200px', xl:'230px'}} onClick={()=>{
        setIsOpen(!isOpen);
        action && action(!isOpen);
    }} borderRadius={'2xl'} bg='#1D222C' height={'40px'} maxH={'80px'} p={1}>
            <TogglerButton value={'Chat'} isOpen={isOpen} />
            <TogglerButton value={'Lobby'} isOpen={!isOpen} />
        </HStack>)
}

export default ChatLobbyToggler;