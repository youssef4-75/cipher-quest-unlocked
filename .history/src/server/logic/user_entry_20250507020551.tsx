import { users } from "../database/player_data";



export function getUser(key: string){
    return users[as keyof typeof users];
}