
import { sendRequest } from "./connect";




export async function getAvailableGames(key: string) {

    // get the variable from the database
    const result= await sendRequest('dashboard', {token: key}, 'POST')
    return result!.data;
    
}

export async function notifyEntry(gameId: string, key: string) {
    await sendRequest('entry', {token: key, gameId}, 'POST');
}