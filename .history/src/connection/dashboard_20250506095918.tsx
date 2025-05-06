


export function getAvailableGames(){
    const gameList = [
        {
            id: "game1",
            title: "The Hidden Message",
            description: "Decode a secret communication to reveal a hidden location.",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=320&auto=format",
            energyCost: 10,
            maxAttempts: 3,
            phases: 3,
            difficulty: "Easy",
            preDone: false
        },
        {
            id: "game2",
            title: "Crypto Conundrum",
            description: "Unscramble complex cryptographic patterns before time runs out.",
            image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=320&auto=format",
            energyCost: 0,
            maxAttempts: 3,
            phases: 5,
            difficulty: "Medium",
            preDone: true
        },
        {
            id: "game3",
            title: "The Lost Code",
            description: "Recover the lost encryption key by solving a series of related puzzles.",
            image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=320&auto=format",
            energyCost: 20,
            maxAttempts: 2,
            phases: 5,
            difficulty: "Hard",
            preDone: false
        },
        {
            id: "game4",
            title: "Binary Secrets",
            description: "Convert binary messages to reveal a mysterious sequence of instructions.",
            image: "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?q=80&w=320&auto=format",
            energyCost: 12,
            maxAttempts: 3,
            phases: 3,
            difficulty: "Medium",
            preDone: false
        },
        {
            id: "game5",
            title: "Ancient Cipher",
            description: "Decode messages using forgotten ancient numerical systems.",
            image: "https://stock.adobe.com/search?k=egyptian+hieroglyphics",
            energyCost: 25,
            maxAttempts: 2,
            phases: 6,
            difficulty: "Expert",
            preDone: false
        },
        {
            id: "game6",
            title: "Daily Challenge",
            description: "A new code-breaking challenge with bonus rewards. Refreshes daily!",
            image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=320&auto=format",
            energyCost: 8,
            maxAttempts: 1,
            phases: 2,
            difficulty: "Varies",
            isDaily: true,
            preDone: true
        }
    ];
    return gameList;
}

