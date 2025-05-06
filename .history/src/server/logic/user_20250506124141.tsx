import { users } from "../database/player_data";


export function getUserFromAuthKey(auth_key: string){
    // for the moment, the auth key is simply the user key
    return users[auth_key];
}


export function authenticateUser(name: string, email: string, passwd: string){
    const a = {
        name: name,
        auth_mail: "you@gmail.com",
        password: passwd,
        energy: 100,
        collectedPwd: [],
        memberSince: "03-05-2025",
        totalGamePlayed: 2,
        accomplishedMission: 2,
        succesRate: 92, // the number of correct submission over the 
        // total number of submission
        longestStreak: 2, // successive mission accomplished
        phaseSolved: 7,
        inventory: [],
        currentGame: [null, null]
    }
}