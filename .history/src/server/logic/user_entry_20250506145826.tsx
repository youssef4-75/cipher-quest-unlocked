import { users } from "../database/player_data";



export function userEnterGame(gameId: string, userId: string) {
    if (users[userId].currentGame[0] !== null){
        throw "This player is already in another game";
    }
    users[userId].currentGame 
}
