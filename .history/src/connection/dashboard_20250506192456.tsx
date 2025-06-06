import { gameList, games } from "@/server/database/games_data";
import { users } from "@/server/database/player_data";




export function getAvailableGames() {

    // get the variable from the database
    return gameList;
}

export function notifyEntry(gameId: string, key: string) {
    //in reality, this is a more complexe function that try to connect to the server and send it some data
    if (energy < energyCost) {
      toast({
        title: "Not enough energy",
        description: `You need ${energyCost} energy to play this game. Wait for your energy to replenish.`,
        variant: "destructive",
      });
      return;
    }
    if (users[key].currentGame[0] !== null) {
        throw "This player is already in another game";
    }
    users[key].currentGame = [gameId, 0];
    users[key].energy -= games[gameId].energyCost;
}