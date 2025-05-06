import { games } from "@/server/database/games_data";
import { users } from "@/server/database/player_data";

// ------------------------------------------------------------------------------------------------------

export function getGames(gameId: string, user_auth: string) {
    // backend logic here for getting the games from the database

    const phase = users[user_auth].currentGame[1] || 0 ;
    if (gameId && (gameId in games)) {
        const { length, title, description, energyCost, maxAttempts, difficulty, detailedDescription } = games[]
        return {
            phase: games[gameId].phases[phase],
            length: games[gameId].length,
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