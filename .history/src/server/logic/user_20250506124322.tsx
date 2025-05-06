import { users } from "../database/player_data";


export function getUserFromAuthKey(auth_key: string){
    // for the moment, the auth key is simply the user key
    return users[auth_key];
}


export function authenticateUser(name: string, email: string, passwd: string){
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
        longestStreak: 2, // successive mission accomplished
        phaseSolved: 7,
        inventory: [],
        currentGame: [null, null]
    }
}