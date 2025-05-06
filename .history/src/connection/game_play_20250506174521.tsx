import { games } from "@/server/database/games_data";
import { users } from "@/server/database/player_data";

// ------------------------------------------------------------------------------------------------------

export function getGames(gameId: string, user_auth: string) {
    // backend logic here for getting the games from the database

    console.log({gameId, user_auth, users, });
    const phase = users[user_auth].currentGame[1];

    if (gameId && (gameId in games)) {
        return {
            phase: games[gameId].phases[phase],
            title: games[gameId].title,
            description: games[gameId].description,
            energyCost: games[gameId].energyCost,
            maxAttempts: games[gameId].maxAttempts,
            difficulty: games[gameId].difficulty,
            detailedDescription: games[gameId].detailedDescription
        };
    }
    return null;
}



export function generateHint(gameId: string, user_auth: string){

}