import { useContext } from "react";
import { GameContext } from "@/context/Contexts";

const useGame = () => 
{
    const {gameSettings, setGameSettings} = useContext(GameContext);
    if (!{gameSettings, setGameSettings})
        throw new Error("wahya")
    return ({gameSettings, setGameSettings})
}

export default useGame;