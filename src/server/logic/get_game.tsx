import { games } from "../database/games_data";
import { users } from "../database/player_data";
import { getUser } from "./users";



export function getGamesList(key: string){
    const user = getUser(key);
    
    
    
    return Object.entries(games).map(([id, game], _) => {
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
            isDaily: game.isDaily
        }
    })
}


export function getGame(gameId: string){
    return games[gameId as keyof typeof games]
}

export function validGameId(gameId: string){
    return gameId && (gameId in games);
}