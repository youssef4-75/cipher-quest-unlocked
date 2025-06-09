import { sendRequest } from "./connect";





export async function getLeaderboard(filter: 'points' | 'solved'){
    const result= await sendRequest('leaderboard', { filter }, 'GET')
    return result!.data;
}


export async function getOwnRank(filter: 'points' | 'solved', token: string){
    const result= await sendRequest('leaderboard', { filter, token }, 'POST')
    return result!.data;
    
}
