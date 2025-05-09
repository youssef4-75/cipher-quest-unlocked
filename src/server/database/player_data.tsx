// a page to simulate the data of a player and the getting and setting operations

import { UserData, UserDataPrivate } from "@/types";

const users: Record<string, UserData> = {
    user_lt2qh99: {
        name: "user0",
        auth_mail: "you@gmail.com",
        password: "2",
        winStreak: 0,
        level: 1,
        themes: {},
        energy: 1,
        points: 10,
        collectedPwd: [],
        memberSince: "03-05-2025",
        totalGamePlayed: 0,
        accomplishedMission: 0,
        wellAttempts: 0, // the number of correct submission over the 
        // total number of submission
        totalAttempts: 0,
        longestStreak: 0, // successive mission accomplished
        phaseSolved: 0,
        currentGame: {
            gameId: null,
            phase: null,
            attempt: null,
            startTime: null
        },
    },
    default: {
        name: "Visitor",
        auth_mail: "nothing@gmail.com",
        password: "__",
        winStreak: 0,
        level: 1,
        themes: {},
        energy: 100,
        points: 10,
        collectedPwd: [],
        memberSince: "03-05-2025",
        totalGamePlayed: 0,
        accomplishedMission: 0,
        wellAttempts: 0, // the number of correct submission over the 
        // total number of submission
        totalAttempts: 0,
        longestStreak: 0, // successive mission accomplished
        phaseSolved: 0,
        currentGame: {
            gameId: null,
            phase: null,
            attempt: null,
            startTime: null
        },
    },
    user_1: {
        name: "user1",
        auth_mail: "you@gmail.com",
        password: "2",
        winStreak: 0,
        themes: {},
        level: 1,
        energy: 100,
        points: 10,
        collectedPwd: [],
        memberSince: "03-05-2025",
        totalGamePlayed: 0,
        accomplishedMission: 0,
        wellAttempts: 0, // the number of correct submission over the 
        // total number of submission
        totalAttempts: 0,
        longestStreak: 0, // successive mission accomplished
        phaseSolved: 0,

        currentGame: {
            gameId: null,
            phase: null,
            attempt: null,
            startTime: null
        },
    },
    user_2: {
        name: "user2",
        auth_mail: "you@gmail.com",
        password: "2",
        winStreak: 0,
        themes: {},
        level: 1,
        energy: 100,
        points: 10,
        collectedPwd: [],
        memberSince: "03-05-2025",
        totalGamePlayed: 0,
        accomplishedMission: 0,
        wellAttempts: 0, // the number of correct submission over the 
        // total number of submission
        totalAttempts: 0,
        longestStreak: 0, // successive mission accomplished
        phaseSolved: 0,
        currentGame: {
            gameId: null,
            phase: null,
            attempt: null,
            startTime: null
        },
    },
    user_3: {
        name: "user3",
        auth_mail: "you@gmail.com",
        password: "2",
        winStreak: 0,
        themes: {},
        level: 1,
        energy: 100,
        points: 10,
        collectedPwd: [],
        memberSince: "03-05-2025",
        totalGamePlayed: 0,
        accomplishedMission: 0,
        wellAttempts: 0, // the number of correct submission over the 
        // total number of submission
        totalAttempts: 0,
        longestStreak: 0, // successive mission accomplished
        phaseSolved: 0,
        currentGame: {
            gameId: null,
            phase: null,
            attempt: null,
            startTime: null
        },
    },
    user_4: {
        name: "user4",
        auth_mail: "you@gmail.com",
        password: "2",
        winStreak: 0,
        themes: {},
        level: 1,
        energy: 100,
        points: 10,
        collectedPwd: [],
        memberSince: "03-05-2025",
        totalGamePlayed: 0,
        accomplishedMission: 0,
        wellAttempts: 0, // the number of correct submission over the 
        // total number of submission
        totalAttempts: 0,
        longestStreak: 0, // successive mission accomplished
        phaseSolved: 0,
        currentGame: {
            gameId: null,
            phase: null,
            attempt: null,
            startTime: null
        },
    },
    user_5: {
        name: "user5",
        auth_mail: "you@gmail.com",
        password: "2",
        winStreak: 0,
        themes: {},
        level: 1,
        energy: 100,
        points: 10,
        collectedPwd: [],
        memberSince: "03-05-2025",
        totalGamePlayed: 0,
        accomplishedMission: 0,
        wellAttempts: 0, // the number of correct submission over the 
        // total number of submission
        totalAttempts: 0,
        longestStreak: 0, // successive mission accomplished
        phaseSolved: 0,
        currentGame: {
            gameId: null,
            phase: null,
            attempt: null,
            startTime: null
        },
    },
    user_6: {
        name: "user6",
        auth_mail: "you@gmail.com",
        password: "2",
        winStreak: 0,
        themes: {},
        level: 1,
        energy: 100,
        points: 10,
        collectedPwd: [],
        memberSince: "03-05-2025",
        totalGamePlayed: 0,
        accomplishedMission: 0,
        wellAttempts: 0, // the number of correct submission over the 
        // total number of submission
        totalAttempts: 0,
        longestStreak: 0, // successive mission accomplished
        phaseSolved: 0,
        currentGame: {
            gameId: null,
            phase: null,
            attempt: null,
            startTime: null
        },
    },
    user_7: {
        name: "user7",
        auth_mail: "you@gmail.com",
        password: "2",
        winStreak: 0,
        themes: {},
        level: 1,
        energy: 100,
        points: 10,
        collectedPwd: [],
        memberSince: "03-05-2025",
        totalGamePlayed: 0,
        accomplishedMission: 0,
        wellAttempts: 0, // the number of correct submission over the 
        // total number of submission
        totalAttempts: 0,
        longestStreak: 0, // successive mission accomplished
        phaseSolved: 0,
        currentGame: {
            gameId: null,
            phase: null,
            attempt: null,
            startTime: null
        },
    },
    user_8: {
        name: "user8",
        auth_mail: "you@gmail.com",
        password: "2",
        winStreak: 0,
        themes: {},
        level: 1,
        energy: 100,
        points: 10,
        collectedPwd: [],
        memberSince: "03-05-2025",
        totalGamePlayed: 0,
        accomplishedMission: 0,
        wellAttempts: 0, // the number of correct submission over the 
        // total number of submission
        totalAttempts: 0,
        longestStreak: 0, // successive mission accomplished
        phaseSolved: 0,
        currentGame: {
            gameId: null,
            phase: null,
            attempt: null,
            startTime: null
        },
    },
    user_9: {
        name: "user9",
        auth_mail: "you@gmail.com",
        password: "2",
        winStreak: 0,
        themes: {},
        level: 1,
        energy: 100,
        points: 10,
        collectedPwd: [],
        memberSince: "03-05-2025",
        totalGamePlayed: 0,
        accomplishedMission: 0,
        wellAttempts: 0, // the number of correct submission over the 
        // total number of submission
        totalAttempts: 0,
        longestStreak: 0, // successive mission accomplished
        phaseSolved: 0,
        currentGame: {
            gameId: null,
            phase: null,
            attempt: null,
            startTime: null
        },
    },
    user_10: {
        name: "user0",
        auth_mail: "you@gmail.com",
        password: "2",
        winStreak: 0,
        themes: {},
        level: 1,
        energy: 100,
        points: 10,
        collectedPwd: [],
        memberSince: "03-05-2025",
        totalGamePlayed: 0,
        accomplishedMission: 0,
        wellAttempts: 0, // the number of correct submission over the 
        // total number of submission
        totalAttempts: 0,
        longestStreak: 0, // successive mission accomplished
        phaseSolved: 0,
        currentGame: {
            gameId: null,
            phase: null,
            attempt: null,
            startTime: null
        },
    },

}

localStorage.setItem("users-database", JSON.stringify(users));

export const getUserDB: () => Record<string, UserData> = () => {
    return JSON.parse(localStorage.getItem("users-database"));
}

export const updateUsersDB: (users: Record<string, UserData>) => void = (users) => {
    localStorage.setItem("users-database", JSON.stringify(users));
}

export const updateUserDB = (key: string, user: UserDataPrivate) => {
    const users = getUserDB();
    const {password, ...rest} = users[key];
    const newUser: UserData = {
        ...user,
        password
    }

    users[key] = newUser;
    updateUsersDB(users);
}

export const addUserDB = (key: string, user: UserData) => {
    const users = getUserDB();
    users[key] = user;
    updateUsersDB(users);
}

