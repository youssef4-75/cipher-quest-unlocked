import { sendRequest } from "./connect";


export const getInv = async () => {
    const result= await sendRequest('inventory', {}, 'GET')
    return result!.data;
};


export async function sendUseDemand(item_to_use: {
    id: number, name: string,
    description: string, quantity: number, icon: string
}, token: string) {
    const result = await sendRequest('inventory', {item_to_use, token}, 'POST')
    return result!.data;
}


export async function purchaseItem(item_to_buy, token: string): Promise<boolean> {
    const result = await sendRequest('purchase', {item_to_buy, token}, 'POST')
    return result!.data;
}