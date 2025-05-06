import { users } from "../database/player_data";


export function getUserFromAuthKey(auth_key: string){
    // for the moment, the auth key is simply the user key
    return users[auth_key];
}


export function authenticateUser(){
    
}