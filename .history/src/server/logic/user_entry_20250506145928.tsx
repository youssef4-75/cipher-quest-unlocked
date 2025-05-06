import { users } from "../database/player_data";



export function userEnterGame(gameId: string, userId: string) {
    if (users[userId].currentGame[0] !== null){
        throw "This player is already in another game";
    }
    console.log("server analysing the request to start a game...")
    console.log("server .")
    users[userId].currentGame = [gameId, 0]
}
