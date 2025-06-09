
import { sendRequest } from "./connect";



export async function sendUseDemand(item_to_use: {
    id: number, name: string,
    description: string, quantity: number, icon: string
}, token: string) {
    const result = await sendRequest('inventory', { item_to_use, token }, 'PUT')
    return result!.data;
}

export async function getPower(token: string): Promise<
        {energy: number, points: number}
    > {
    const result = await sendRequest('profile', { token }, 'POST')
    return result!.data;
}

export async function getProfile(token: string) {
    // return {solvedPasswords, name, email, points, energy, achievements, inventory, stats}
    const result = await sendRequest('my_profile', { token }, 'POST')
    return result!.data;
}
