import { games } from "@/server/database/games_data";
import { users } from "@/server/database/player_data";


const HINT_COST = 5;

// ------------------------------------------------------------------------------------------------------

export function getGames(gameId: string, user_auth: string) {
    // backend logic here for getting the games from the database

    const phase = users[user_auth].currentGame[1] || 0;
    if (gameId && (gameId in games)) {
        const { length, title, description, energyCost,
            maxAttempts, difficulty, detailedDescription, phases } = games[gameId];
        
        const {password, ...rest} = phases[phase];
        return {
            phase: rest,
            length: length,
            title: title,
            description: description,
            energyCost: energyCost,
            maxAttempts: maxAttempts,
            difficulty: difficulty,
            detailedDescription: detailedDescription
        };
    }
    return null;
}



export function generateHint(gameId: string, user_auth: string) {

    const user = users[user_auth];
    const phase = user.currentGame[1] || 0;
    if (gameId && (gameId in games)) {
        if (points < HINT_COST) {
            toast({
                title: "Not enough points",
                description: `You need ${HINT_COST} points to use a hint. You have ${points} points.`,
                variant: "destructive",
            });
            return;
        }
        const { phases } = games[gameId];

        const { password: correctPassword, ...rest } = phases[phase];
        
        
        let hintText = "";

        // Simple hint: reveal the first couple characters of the password
        if (correctPassword.length <= 6) {
            hintText = `The password begins with "${correctPassword.substring(0, 1)}..."`;
        } else {
            hintText = `The password begins with "${correctPassword.substring(0, 2)}..."`;
        }

        // Deduct points
        user.energy -= HINT_COST;
        return hintText;
        
    }
    return null;
}