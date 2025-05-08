import { UsersList, getUser } from "@/server/logic/users";




function gLboard(filter: 'points' | 'solved'){
    // to get the leaderboard [first ten player and your own order]
    const leaderboard = UsersList().map((element, index) => {
        return {
            id: index,
            name: element.name,
            points: element.points,
            solved: element.accomplishedMission,
        }
    });
    if (filter === 'points'){
        return leaderboard.sort((a, b) => b.points - a.points);
    } else {
        return leaderboard.sort((a, b) => b.solved - a.solved);
    }
}

export function getLeaderboard(filter: 'points' | 'solved'){
    return gLboard(filter).slice(0, 10);
}


export function getOwnRank(filter: 'points' | 'solved', key: string){
    const user = getUser(key);
       
    const leaderboard = gLboard(filter);

    const ownRank = leaderboard.findIndex(player => player.name === user?.name);
    if (ownRank === -1){
        return { rank: 103, points: -20, solved: 1 };
    }
    return {rank: ownRank+1, points: user?.points, solved: user?.accomplishedMission};
}
