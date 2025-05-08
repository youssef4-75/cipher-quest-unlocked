import { games } from "@/server/database/games_data";
import { users } from "@/server/database/player_data";
import { getGame, getGamesList } from "@/server/logic/get_game";




export function getAvailableGames() {

    // get the variable from the database
    return getGamesList();
}

export function notifyEntry(gameId: string, key: string) {
    //in reality, this is a more complexe function that try to connect to the server and send it some data
    const game = getGame(game)
    
    if (users[key].currentGame[0] !== null) {
        throw "This player is already in another game";
    }
    const energyCost = games[gameId].energyCost;
    const energy = users[key].energy;

    if (energy < energyCost) {
        return null;
    }
    users[key].currentGame = [gameId, 0, 0];
    users[key].energy -= energyCost;
}