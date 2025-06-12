import { sendRequest } from "./connect";

export async function registerUserC(email: string, password: string, name: string) {
    // in real app, these data will be sent to the server and the server will return a response
    const result = await sendRequest('register', {email, password, name}, 'POST');
        
    return result!.data!.token;

    

    // return await registerUser(email, password, name);
}

export async function loginUserC(email: string,
        password: string,
        toast?: ({ ...props }: any) => { id: string; dismiss: () => void; update: (props: any) => void; }
    ) {
    // in real app, these data will be sent to the server and the server will return a response
    const result = await sendRequest('login', {email, password}, 'POST', toast, 'cannot login');
    
    if(result) return result.data;
    return null;
    // return await loginUser(email, password);
}

export async function energyRecovery(key: string) {
    // in real app, these data will be sent to the server and the server will return a response
    await sendRequest('recovery', { token: key }, 'POST');
}

export async function login(email: string, password: string): Promise<{
    id: string;
    email: any;
    name: any;
    energy: any;
    points: any;
    solvedPasswords: any;
}> {
    const result = await sendRequest('login', { email, password }, 'POST');
    return result!.data;
}



