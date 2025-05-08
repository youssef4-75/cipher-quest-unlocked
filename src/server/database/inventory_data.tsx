import { User, Game } from "../logic/types"

export const inventories: {id: number, name: string, description: string, icon: string, ingame: boolean, rarity: string, effect: (user: User, game: Game|undefined) => void}[] = [
    {
        id: 1,
        name: "Vowel Compass",
        description: "Reveals all vowel positions in the password",
        icon: "🔤",
        ingame: true,
        rarity: "common",
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 2,
        name: "Consonant Filter",
        description: "Eliminates 3 impossible consonants",
        icon: "✂️",
        ingame: true,
        rarity: "uncommon",
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 3,
        name: "Time Extender",
        description: "Adds 20 seconds to the clock",
        icon: "⏳",
        ingame: true,
        rarity: "common",
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 4,
        name: "Attempt Refill",
        description: "Restores 1 guess attempt",
        icon: "🔄",
        ingame: true,
        rarity: "rare",
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 5,
        name: "Letter Frequency Scanner",
        description: "Shows top 3 most common letters",
        icon: "📊",
        ingame: true,
        rarity: "uncommon",
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 6,
        name: "Password Length Decoder",
        description: "Reveals how many characters the password has",
        icon: "📏",
        ingame: false,
        rarity: "common",
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 7,
        name: "Lucky Charm",
        description: "Next incorrect guess won't count as attempt",
        icon: "🍀",
        ingame: true,
        rarity: 'uncommon',
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 8,
        name: "Double Letter Detector",
        description: "Highlights any repeating letters",
        icon: "🔠",
        ingame: true,
        rarity: "uncommon",
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 9,
        name: "First Letter Hint",
        description: "Reveals the password's starting letter",
        icon: "🔍",
        ingame: true,
        rarity: "common",
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 10,
        name: "Last Letter Hint",
        description: "Reveals the password's ending letter",
        icon: "🔚",
        ingame: true,
        rarity: "rare",
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 11,
        name: "No Vowels Mode",
        description: "Temporarily hides all vowels",
        icon: "🚫",
        ingame: true,
        rarity: "epic",
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 12,
        name: "Mirror View",
        description: "Displays password letters in reverse order",
        icon: "🪞",
        ingame: true,
        rarity: "epic",
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 13,
        name: "Letter Eliminator",
        description: "Removes 5 impossible letters from keyboard",
        icon: "❌",
        ingame: true,
        rarity: "rare",
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 14,
        name: "Freeze Timer",
        description: "Pauses the clock for 10 seconds",
        icon: "❄️",
        ingame: true,
        rarity: "uncommon",
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 15,
        name: "Phase Skipper",
        description: "Skip current phase (no points earned)",
        icon: "⏭️",
        ingame: false,
        rarity: "epic",
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 16,
        name: "Point Doubler",
        description: "Doubles points earned next game",
        icon: "💰",
        ingame: false,
        rarity: "rare",
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 17,
        name: "Energy Saver",
        description: "Reduces energy cost by 50% next game",
        icon: "♻️",
        ingame: false,
        rarity: "uncommon",
        effect: (user: User, game: Game|undefined) => {}
    },
    {
        id: 18,
        name: "Perfect Guess",
        description: "Next correct guess counts double",
        icon: "🎯",
        ingame: true,
        rarity: "epic",
        effect: (user: User, game: Game|undefined) => {}
    },
];