import { users } from "../database/player_data";



export function getUser(key: string){
    const {password, ...rest } users[key as keyof typeof users];
}