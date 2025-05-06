import { gameList } from "@/server/database/games_data";



export function getAvailableGames(){
    
    // get the variable from the database
    return gameList;
}

function notifyEntry(gameI) {
    userEnterGame()
}