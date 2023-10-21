import { useContext } from "react";
import { GameContext } from "@/context/Contexts";

const useGame = () => useContext(GameContext);

export default useGame;