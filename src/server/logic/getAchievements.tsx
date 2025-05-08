import { achievements } from "../database/achievements";
import { correspondingAchievements } from "../database/user_achiev_data";



export const getAchievements = (key: string) => {
    const achievement: {id: number, name: string, description: string}[] = [];
    for (const [userKey, achievIndex] of correspondingAchievements) {
        if (userKey === key) {
            let {validator, ...achiev} = achievements[achievIndex - 1]
            achievement.push(achiev);
        }
    }
    return achievement;
}

