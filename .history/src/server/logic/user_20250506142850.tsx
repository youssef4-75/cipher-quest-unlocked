import { users } from "../database/player_data";


export function getUserFromAuthKey(auth_key: string) {
    // for the moment, the auth key is simply the user key
    return users[auth_key];
}


export async function registerUser(email: string, passwd: string, name: string) {
    const a = {
        name: name,
        auth_mail: email,
        password: passwd,
        energy: 100,
        collectedPwd: [],
        memberSince: Date(),
        totalGamePlayed: 0,
        accomplishedMission: 0,
        succesRate: 0, // the number of correct submission over the 
        // total number of submission
        longestStreak: 0, // successive mission accomplished
        phaseSolved: 0,
        inventory: [],
        currentGame: [null, null]
    }

    const key = name + email; // normally generated in the server side via JWT, to be implemented later
    users[key] = a;
    return key
}


export async function loginUser(email, password){
    for(a of users){
        
    }
    return {}
}