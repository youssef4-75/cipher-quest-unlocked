import { getGame, getGamesList } from "@/server/logic/get_game";
import { getUser } from "@/server/logic/users";
import { updateUserDB } from "../database/player_data";




export function getAvailableGames(key: string) {

    // get the variable from the database
    return getGamesList(key);
}

export function notifyEntry(gameId: string, key: string) {
    //in reality, this is a more complexe function that try to connect to the server and send it some data
    const game = getGame(gameId);
    const user = getUser(key);

    if (user.currentGame.gameId !== null) {
        throw "This player is already in another game";
    }
    const energyCost = game.energyCost;
    const energy = user.energy;

    

    if (energy < energyCost) {
        return null;
    }

    user.currentGame.gameId = gameId;
    user.currentGame.phase = 0;
    user.currentGame.attempt = 0;
    user.currentGame.startTime = Date.now();
    user.energy -= energyCost;
    updateUserDB(key, user);
}