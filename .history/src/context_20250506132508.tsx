import { createContext, useContext } from "react";
import { AuthContextType, GameContextType } from "./types";



export const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) throw new Error("useGame must be used within a GameProvider");
    return context;
};
