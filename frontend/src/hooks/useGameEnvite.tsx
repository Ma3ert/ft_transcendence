import { useContext } from "react";
import { ChatContext, GlobalContext } from "../context/Contexts";
import { Socket } from "socket.io-client";

const useGameEnvite = () => {

    const {setGameEnvitation, setJoinGameStatus} = useContext(ChatContext)
    return (from:string, to:string) => {
        setGameEnvitation!({from:from, to:to})
        setJoinGameStatus!(true)  
    }
}

export default useGameEnvite