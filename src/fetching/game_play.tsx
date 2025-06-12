
import { PartialGame } from "@/types";
import { sendRequest } from "./connect";





export async function getGames(gameId: string, token: string): Promise<PartialGame | null> {
    // backend logic here for getting the games from the database
    const result= await sendRequest('games', {gameId, token}, 'POST')
    return result!.data
}


export async function generateHint(gameId: string, token: string, hintText: string) {
    const result= await sendRequest('hint', {gameId, token, hintText}, 'POST')
    return result!.data;
}


export async function notifyLoss(gameId: string, token: string) {

    await sendRequest('lose', {gameId, token}, 'POST');
    return;
    
}

export async function submitAnswer(token: string, passwordTentative: string, hintText: string): Promise<{
    state: string,
    res: {
        finalPassword: string,
        sim: number
    }
}> {
    const result= await sendRequest('submit', { token, passwordTentative, hintText }, 'PUT')
    return result!.data;
    
}


// Highlight correct characters in the password
export const highlightPassword = async (attempt: string, gameId: string, token: string): Promise<{
    key: number;
    color: string;
    letter: any;
}[]> => {
    // (|attempt|: string, |attemptIndex|: number, |correctPassword|: string, maxAttempts: number): JSX.Element
    const result= await sendRequest('highlight', { attempt, gameId, token }, 'POST')
    return result!.data;
};



