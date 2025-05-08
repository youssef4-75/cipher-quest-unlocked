
export type User = {
    name: string;
    auth_mail: string;
    password: string;
    energy: number;
    points: number;
    collectedPwd: string[];
    memberSince: string;
    totalGamePlayed: number;
    accomplishedMission: number;
    succesRate: number;
    longestStreak: number;
    phaseSolved: number;
    inventory: string[];
    currentGame: [string, number, number];
} | null;


// Game context
export type Game = {
    title: string;
    isDaily: boolean;
    theme: string;
    image: string;
    description: string;
    energyCost: number;
    maxAttempts: number;
    length: number;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Varies';
    detailedDescription: string;
    phases: {
        description: string;
        messages: {
            id: number;
            text: string;
            hash: number;
            position: { top: number, left: number };
        }[];
        password: string;
    }[];
    finalPassword: string;
};


export type Achievement = {
    id: number;
    name: string;
    description: string;
    validator: (user: User) => boolean;
}

export type PartialGame = {
    title: string;
    description: string;
    energyCost: number;
    maxAttempts: number;
    length: number;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Varies';
    detailedDescription: string;
    phase: {
        description: string;
        messages: {
            id: number;
            text: string;
            hash: number;
            position: { top: number, left: number };
        }[];
    };    

}