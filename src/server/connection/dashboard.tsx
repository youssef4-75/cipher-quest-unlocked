import { getGame, getGamesList } from "@/server/logic/get_game";
import { getUser } from "@/server/logic/users";




export function getAvailableGames(key: string) {

    // get the variable from the database
    const games = getGamesList(key);
    return games;
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
    
    user.currentGame[0] = gameId;
    user.currentGame[1] = 0;
    user.currentGame[2] = 0;
    user.energy -= energyCost;
}