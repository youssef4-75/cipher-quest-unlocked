import { loginUser, registerUser } from "@/server/logic/authenticate";


export async function registerUserC(email: string, password: string, name: string) {
    // in real app, these data will be sent to the server and the server will return a response
    return await registerUser(email, password, name);
}


export async function loginUserC(email: string, password: string) {
    // in real app, these data will be sent to the server and the server will return a response
    return await loginUser(email, password);
}
