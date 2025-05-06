

export function sendUseDemand(item_to_use: {
    id: number, name: string,
    description: string, quantity: number, icon: string
},) {
    // backend logic goes here
    console.log(`request to use the item ${item_to_use.name}`);
    item_to_use.quantity ++;
}