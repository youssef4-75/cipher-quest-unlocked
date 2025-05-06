import { gameList } from "@/server/database/games_data";



export function getAvailableGames(){
    
    return gameList;
}

function notifyEntry() {
    // used to notify the server that the player is starting to play, 
    // therefore he needs to activate the items he bought

    // included in the getGame method, normally the user in this page wont 
    // need to get more than the game he is playing at the moment
}