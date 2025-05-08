import { UserData } from "@/types";
import { users } from "../database/player_data";



export async function registerUser(email: string, passwd: string, name: string) {
    const a: UserData = {
        name: name,
        auth_mail: email,
        password: passwd,
        energy: 100,
        collectedPwd: [],
        themes: {},
        winStreak: 0, 
        level: 1,
        points: 100, 
        totalAttempts: 0,
        memberSince: Date(),
        totalGamePlayed: 0,
        accomplishedMission: 0,
        succesRate: 0, // the number of correct submission over the 
        // total number of submission
        longestStreak: 0, // successive mission accomplished
        phaseSolved: 0,
        currentGame: [null, null, null]
    }

    const key = "user_" + name + email; // normally generated in the server side via JWT, to be implemented later
    users[key] = a;
    return key
}


export async function loginUser(email: string, password: string) {
    for (const key of Object.keys(users)) {
        if (users[key].auth_mail === email
            &&
            users[key].password === password) {
            return {
                id: key, email,
                name: users[key].name
            }
        }
    }
    throw ("Login credentials are not matching, find out your"
        + " password first before guessing others password")
}

