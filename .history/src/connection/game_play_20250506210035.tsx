import { games } from "@/server/database/games_data";
import { users } from "@/server/database/player_data";


const HINT_COST = 5;


// Calculate similarity between two strings
const calculateSimilarity = (inputPassword: string, correctPassword: string): number => {
    let similarity = 0;
    const inputLower = inputPassword.toLowerCase();
    const correctLower = correctPassword.toLowerCase();

    // Check each character in input password
    for (let i = 0; i < inputLower.length; i++) {
        const char = inputLower[i];

        // Check if character exists in correct password
        const correctIndex = correctLower.indexOf(char);
        if (correctIndex !== -1) {
            similarity += correctLower.length - Math.abs(correctIndex - i);
        }
    }

    // Normalize score to percentage (0-100)
    const maxPossibleScore = correctLower.length * correctLower.length;
    return Math.round((similarity / maxPossibleScore) * 100);
};


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
        if (user.points < HINT_COST) {
            return null;
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


export function submitAnswer(user_auth: string, passwordTentative: string){
    const user = users[user_auth as keyof typeof users];
    
    const gameId = user.currentGame[0];
    const phaseIndex = user.currentGame[1] || 0;
    
    if (gameId && (gameId in games)) {
        const game = games[gameId as keyof typeof games];
        if (user.currentGame[1] >= game.maxAttempts){
            return { state: 'useless', res: { finalPassword: null, sim: 0, highlighted: "", phase: null } }
        }
        const currentPhaseData = game.phases[phaseIndex];
        const correctPassword = currentPhaseData.password;
        if (passwordTentative.toLowerCase() === correctPassword.toLowerCase()) {
            // Password is correct
            // setCurrentPhase(prev => prev + 1);
            user.currentGame[1] += 1
            if (user.currentGame[1] === game.length - 1) {
                // Game completed

                user.collectedPwd.push(game.finalPassword);
                user.points += game.difficulty === "Easy" ? 20 : game.difficulty === "Medium" ? 40 : 60;
                return { state: 'win', res: { finalPassword: game.finalPassword, sim: 0, highlighted: "", phase: null } };
            } else {
                // Move to next phase
                const { password, ...rest } = game.phases[user.currentGame[1]];
                return { state: 'next', res: { finalPassword: null, sim: 0, highlighted: "", phase: rest } };
            }
        } else {
            // Password is incorrect
            user.currentGame[2] += 1
            // setAttempts(prev => prev + 1);

            // Calculate similarity score
            const similarity = calculateSimilarity(passwordTentative, correctPassword);
            const sim = similarity;

            // Save the incorrect attempt for highlighting
            const highlighted = highlightPassword(passwordTentative, user.currentGame[2], correctPassword, game.maxAttempts);

            if (user.currentGame[2] + 1 >= game.maxAttempts) {
                // Game over
                return {state: 'lost', res: {finalPassword: null, sim: 0, highlighted: "", phase: null}};
            } else {
                return { state: 'false', res: { finalPassword: null, sim, highlighted, phase: null } };
            }
        }
        
    }
    return null;

}

const highlightPassword = (attempt: string, attemptIndex: number, correctPassword: string, maxAttempts: number): JSX.Element => {

    //if there are more than 2 attempts left, do nothing
    let corr_color = ''
    let fals_color = ''
    if (attemptIndex + 2 >= maxAttempts) {
        corr_color = 'green';
        fals_color = 'red';
    }

    const result: JSX.Element[] = [];
    const attemptLower = attempt.toLowerCase();
    const correctLower = correctPassword.toLowerCase();

    for (let i = 0; i < attemptLower.length; i++) {
        const char = attemptLower[i];

        if (i < correctLower.length && char === correctLower[i]) {
            // Character is in correct position
            result.push(<span key={i} className={`text-` + corr_color + `-500 font-bold`}>{attempt[i]}</span>);
        } else {
            // Character is incorrect or in wrong position
            result.push(<span className={`text-` + fals_color + `-500 font-bold`} key={i}>{attempt[i]}</span>);
        }
    }

    return <div className="flex">{result}</div>;
};
