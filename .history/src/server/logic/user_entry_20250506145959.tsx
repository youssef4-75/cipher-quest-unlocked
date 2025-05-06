import { users } from "../database/player_data";



export function userEnterGame(gameId: string, userId: string) {
    if (users[userId].currentGame[0] !== null){
        throw "This player is already in another game";
    }
    console.log("server analysing the request to start a game...")
    console.log("player have no previous undone mission, he can start this one...")
    users[userId].currentGame = [gameId, 0]
}
