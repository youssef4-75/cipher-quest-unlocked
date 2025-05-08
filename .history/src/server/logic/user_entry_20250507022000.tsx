import { users } from "../database/player_data";



export function getUser(key: string){
    co users[key as keyof typeof users];
}