import { users } from "../database/player_data";



export function getUser(key: string) {
    
    if(users.hasOwnProperty(key)) { 
        const { password, ...rest } = users[key as keyof typeof users];
        
        return rest;
    }
    
    return users["default"];
}


export function UsersList() {
    return Object.values(users).map((element, index) => {
        const { password, 
            collectedPwd, 
            auth_mail, 
            currentGame, 
            ...rest } = element;
        return rest;
    });
};




