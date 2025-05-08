import { inventories } from "../database/inventory_data";
import { correspondingInventory } from "../database/user_invent_data";



export const getInventory = (key: string) => {
    const inventory: {
        quantity: number;
        id: number;
        name: string;
        description: string;
        icon: string;
        ingame: boolean;
        rarity: string;
    }[] = [];
    for (const [userKey, achievIndex, quantity] of correspondingInventory) {
        if (userKey === key) {
            let { effect, ...achiev } = {...inventories[achievIndex - 1], quantity}
            inventory.push(achiev);
        }
    }
    return inventory;
}
