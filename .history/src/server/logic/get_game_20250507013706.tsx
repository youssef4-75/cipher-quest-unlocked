import { gameList, games } from "../database/games_data";



export function getGamesList(){
    return gameList
}


export function getGame(gameId: string){
    return games[gameId]
}