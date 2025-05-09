import { getGame, validGameId } from "@/server/logic/get_game";
import { getUser } from "@/server/logic/users";
import { PartialGame } from "../logic/types";
import { updateUserDB } from "../database/player_data";


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
        } else {
            similarity = 1;
        }
    }

    // Normalize score to percentage (0-100)
    const maxPossibleScore = inputPassword.length * inputPassword.length || 1;
    return Math.round((similarity / maxPossibleScore) * 100);
};


function hinting(realPassword: string, currentHint: string) {
    if (currentHint == realPassword) {

        return currentHint;
    }
    let hintIndex: number = Math.floor(Math.random() * realPassword.length);

    while (currentHint && currentHint[hintIndex] !== "*") {
        hintIndex = Math.floor(Math.random() * realPassword.length);
    }
    let hint: string = "";
    for (let loopIndex = 0; loopIndex < realPassword.length; loopIndex++) {
        if (loopIndex === hintIndex) {
            hint += realPassword[hintIndex];
        } else
        // if (realPassword[loopIndex] === "-"){
        //     hint += "-";
        // } else 
        {
            hint += currentHint !== null ? currentHint[loopIndex] : "*";
        }
    }

    return hint;
}

function reward(difficulty: string, entryTimes: number, preDone: boolean) {

    const addon = difficulty === "Easy" && preDone ? 5 :
        difficulty === "Medium" && preDone ? 10 :
            difficulty === "Hard" && preDone ? 20 :
                preDone ? 25 :
                    difficulty === "Easy" ? 20 :
                        difficulty === "Medium" ? 40 :
                            difficulty === "Hard" ? 80 :
                                160;
    const div = Math.pow(2, (entryTimes || 1) - 1)
    return addon / div;
}


function WinGame(gameId: string, key: string) {
    const user = getUser(key);
    const game = getGame(gameId);

    user.wellAttempts = game.length
    // add the theme to the user's themes
    user.themes[game.theme] = (user.themes[game.theme] || 0) + 1;
    user.accomplishedMission += 1;
    user.winStreak += 1;
    if (user.winStreak > user.longestStreak) {
        user.longestStreak = user.winStreak;
    }
    user.totalAttempts += user.currentGame.attempt + game.length;
    user.currentGame.gameId = null;
    user.currentGame.phase = null;
    user.currentGame.attempt = null;
    user.currentGame.startTime = null;
    user.currentGame.entryTimes = null;


    if (user.collectedPwd.includes(game.finalPassword)) {
        user.points += reward(game.difficulty, user.currentGame.entryTimes, true);
        updateUserDB(key, user);
        return;
    }

    user.collectedPwd.push(game.finalPassword);
    user.points += reward(game.difficulty, user.currentGame.entryTimes, false);

    user.totalGamePlayed += 1;



    updateUserDB(key, user);
    // handling achievements and inventory, for the backend to developp

}

function LoseGame(gameId: string, key: string) {
    const user = getUser(key);
    const game = getGame(gameId);

    user.winStreak = 0;
    user.totalGamePlayed += 1;
    user.wellAttempts += user.currentGame.phase;
    user.totalAttempts += game.maxAttempts + user.currentGame.phase;
    user.currentGame.gameId = null;
    user.currentGame.phase = null;
    user.currentGame.attempt = null;
    user.currentGame.startTime = null;
    user.currentGame.entryTimes = null;

    updateUserDB(key, user);
}




// ------------------------------------------------------------------------------------------------------

export function getGames(gameId: string, key: string): PartialGame | null {
    // backend logic here for getting the games from the database

    const user = getUser(key);
    if (user.currentGame.gameId != gameId) {
        return null;
    }
    const phaseIndex = user.currentGame.phase || 0;
    if (validGameId(gameId)) {
        const { length, title, description, energyCost,
            maxAttempts, difficulty, detailedDescription, phases, timeLimit } = getGame(gameId);
        if (phaseIndex >= length) {
            return null;
        }


        const { password, ...phase } = phases[(phaseIndex)];
        return {
            phase,
            length,
            timeLimit,
            title,
            description,
            energyCost,
            maxAttempts,
            difficulty,
            detailedDescription
        };
    }
    return null;
}


export function generateHint(gameId: string, key: string, hintText: string) {

    const user = getUser(key);
    const phase = user.currentGame.phase || 0;
    if (validGameId(gameId)) {
        if (user.points < HINT_COST) {
            return null;
        }
        const { phases } = getGame(gameId);

        const { password: correctPassword, ..._ } = phases[phase];


        const hint = hinting(correctPassword, hintText);

        // Simple hint: reveal the first couple characters of the password

        hintText = hint;


        // Deduct points
        user.points -= HINT_COST;
        updateUserDB(key, user);
        return hintText;

    }
    return null;
}


export function notifyLoss(gameId: string, key: string) {
    const user = getUser(key);
    const game = getGame(gameId);
    user.currentGame.attempt = game.maxAttempts;
    updateUserDB(key, user);
    LoseGame(gameId, key);
}

export function submitAnswer(key: string, passwordTentative: string, hintText: string): {
    state: string,
    res: {
        finalPassword: string,
        sim: number
    }
} {
    const user = getUser(key);
    const gameId = user.currentGame.gameId;
    const phaseIndex = user.currentGame.phase || 0;


    if (validGameId(gameId)) {
        const game = getGame(gameId);
        if (user.currentGame.attempt >= game.maxAttempts || user.currentGame.startTime + 1000*game.timeLimit < Date.now()) {
            return { state: 'useless', res: { finalPassword: null, sim: 0 } }
        }
        const currentPhaseData = game.phases[phaseIndex];
        const correctPassword = currentPhaseData.password;
        if (passwordTentative.toLowerCase() === correctPassword.toLowerCase()) {
            // Password is correct
            // setCurrentPhase(prev => prev + 1);

            user.currentGame.phase += 1
            user.phaseSolved += 1
            user.currentGame.startTime = Date.now();
            updateUserDB(key, user);
            if (user.currentGame.phase === game.length) {
                // Game completed
                WinGame(gameId, key);
                return { state: 'win', res: { finalPassword: game.finalPassword, sim: 0 } };

            } else {
                return { state: 'next', res: { finalPassword: null, sim: 0 } };
            }
        } else {
            // Password is incorrect
            user.currentGame.attempt += 1
            // setAttempts(prev => prev + 1);

            // Calculate similarity score
            const similarity = calculateSimilarity(passwordTentative, correctPassword);
            const sim = similarity;

            // Save the incorrect attempt for highlighting
            updateUserDB(key, user);


            if (user.currentGame.attempt >= game.maxAttempts) {
                // Game over
                LoseGame(gameId, key)
                return { state: 'lost', res: { finalPassword: null, sim: 0 } };

            } else {

                const finalPassword = hinting(correctPassword, hintText);
                return { state: 'false', res: { finalPassword, sim } };
            }
        }

    }
    return null;

}


// Highlight correct characters in the password
export const highlightPassword = (attempt: string, gameId: string, key: string): JSX.Element => {
    // (|attempt|: string, |attemptIndex|: number, |correctPassword|: string, maxAttempts: number): JSX.Element

    const user = getUser(key);
    const attemptIndex = user.currentGame.attempt;
    const game = getGame(gameId);
    const correctPassword = game.phases[user.currentGame.phase].password;
    const maxAttempts = game.maxAttempts;

    if (attempt.length > 0) {
        return
    }


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



