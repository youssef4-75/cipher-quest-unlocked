import { getGamesDB } from "../database/games_data";
import { getUser } from "./users";
import { Game } from "../logic/types";



export function getGamesList(key: string){
    const user = getUser(key);
    
    
    return Object.entries(getGamesDB()).map(([id, game], _) => {
        return {
            id: id,
            title: game.title,
            description: game.description,
            image: game.image,
            energyCost: game.energyCost,
            maxAttempts: game.maxAttempts,
            phases: game.length,
            difficulty: game.difficulty,
            preDone: user.collectedPwd.includes(game.finalPassword),
            theme: game.theme,
            isDaily: game.isDaily,
            playable: [null, id].includes(user.currentGame.gameId),
            
        }
    })
}


export function getGame(gameId: string){
    return getGamesDB()[gameId]
}

export function validGameId(gameId: string){
    return gameId && (gameId in getGamesDB());
}