import { getGame, getGamesList } from "@/server/logic/get_game";
import { getUser } from "@/server/logic/user_entry";




export function getAvailableGames() {

    // get the variable from the database
    return getGamesList();
}

export function notifyEntry(gameId: string, key: string) {
    //in reality, this is a more complexe function that try to connect to the server and send it some data
    const game = getGame(gameId);
    const user = getUser(key);
    
    if (user.currentGame[0] !== null) {
        throw "This player is already in another game";
    }
    const energyCost = game.energyCost;
    const energy = user.energy;

    if (energy < energyCost) {
        return null;
    }
    user.currentGame = [gameId, 0, 0];
    user.energy -= energyCost;
}