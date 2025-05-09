import { loginUser, registerUser } from "@/server/logic/authenticate";
import { getUser } from "../logic/users";
import { updateUserDB } from "../database/player_data";

export async function registerUserC(email: string, password: string, name: string) {
    // in real app, these data will be sent to the server and the server will return a response
    return await registerUser(email, password, name);
}


export async function loginUserC(email: string, password: string) {
    // in real app, these data will be sent to the server and the server will return a response
    return await loginUser(email, password);
}

export async function energyRecovery(key: string) {
    // in real app, these data will be sent to the server and the server will return a response
    const user = await getUser(key);
    if(user.energy < 100){
        user.energy += 1;
    }
    updateUserDB(key, user);
}



