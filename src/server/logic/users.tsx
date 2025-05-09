import { getUserDB as getUsersDB } from "../database/player_data";



export function getUser(key: string) {
    
    if(getUsersDB().hasOwnProperty(key)) { 
        const { password, ...rest } = getUsersDB()[key];
        
        return rest;
    }
    
    return getUsersDB()["default"];
}


export function UsersList() {
    return Object.values(getUsersDB()).map((element, index) => {
        const { password, 
            collectedPwd, 
            auth_mail, 
            currentGame, 
            ...rest } = element;
        return rest;
    });
};




