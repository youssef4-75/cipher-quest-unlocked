import { getAchievements } from "@/server/logic/getAchievements";
import { getInventory } from "@/server/logic/getInventory";
import { getUser } from "@/server/logic/users";



export function sendUseDemand(item_to_use: {
    id: number, name: string,
    description: string, quantity: number, icon: string
},) {
    // backend logic goes here
}

export function getPower(key: string) {

    const user = getUser(key);
    if (!user) {

        return { energy: 100, points: 0 };
    }

    return { energy: user?.energy, points: user?.points };
}

export function getProfile(key: string) {
    // return {solvedPasswords, name, email, points, energy, achievements, inventory, stats}
    const user = getUser(key);

    const achievements = getAchievements(key);
    const inventory = getInventory(key);

    const stats = {
        inGameAge: ((Date.now() -
            new Date(user.memberSince).getTime())
            / (1000 * 60 * 60 * 24 * 365)).toFixed(2),
        // return the number of years in the game with dots

        gamesPlayed: user.totalGamePlayed,
        gamesWon: user.accomplishedMission,
        successRate: `${user.wellAttempts / (user.totalAttempts||1)}%`,
        longestStreak: user.longestStreak,
        totalPhasesSolved: user.phaseSolved,
        Theme: Object.keys(user.themes).sort((a, b) => user.themes[b] - user.themes[a])[0] || 'No theme'
    };

    const solvedPasswords = user.collectedPwd;
    const { name, auth_mail: email, level, points, energy } = user;


    return { solvedPasswords, name, email, level, points, energy, achievements, inventory, stats };


}
