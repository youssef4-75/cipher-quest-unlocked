import { gameList } from "@/server/database/games_data";
import { userEnterGame } from "@/server/logic/user_entry";



export function getAvailableGames() {

    // get the variable from the database
    return gameList;
}

export function notifyEntry(gameId, key) {
    //in reality, this is a more complexe function that try to connect to the server and send it 
    userEnterGame(gameId, key);
}