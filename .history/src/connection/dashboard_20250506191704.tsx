import { gameList } from "@/server/database/games_data";
import { users } from "@/server/database/player_data";




export function getAvailableGames() {

    // get the variable from the database
    return gameList;
}

export function notifyEntry(gameId, key) {
    //in reality, this is a more complexe function that try to connect to the server and send it some data
    if (users[key].currentGame[0] !== null) {
        throw "This player is already in another game";
    }
    users[نثغ].currentGame = [gameId, 0]
}