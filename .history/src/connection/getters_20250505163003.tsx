

const ranPosGenerator = (n: number) => Math.round(Math.random() * n)


export function getGames(){
    // backend logic here for getting the games from the database

    return {
        game1: {
            title: "The Hidden Message",
            description: "Decode a secret communication to reveal a hidden location.",
            energyCost: 10,
            maxAttempts: 3,
            difficulty: "Easy",
            detailedDescription: `
This game challenges your ability to decode and rearrange hidden messages. 
Pay close attention to the numbers in parentheses, as they indicate the order
  of words in the final password. Solving this puzzle will lead you to a hidden 
location that contains valuable information about the next challenge.`,
            phases: [
                {
                    description: "Find the parts of a secret password that will unlock the next clue. Arrange them in the correct order.",
                    messages: [
                        { id: 1, text: "First part is 'pass'", hash: 2, position: { top: 15, left: 20 } },
                        { id: 2, text: "The code begins with 'cipher'", hash: 1, position: { top: 60, left: 70 } },
                        { id: 3, text: "Final segment is 'word'", hash: 3, position: { top: 40, left: 40 } }
                    ],
                    password: "a"
                },
                // {
                //   description: "Colors are important in this stage. Pay attention to the numbers indicating the order.",
                //   messages: [
                //     { id: 1, text: "Sky color", hash: 3, position: { top: 25, left: 30 } },
                //     { id: 2, text: "Roses are...", hash: 1, position: { top: 70, left: 10 } },
                //     { id: 3, text: "Secret code: 123", hash: 2, position: { top: 50, left: 65 } }
                //   ],
                //   password: "red123blue"
                // },
                // {
                //   description: "This puzzle is about valuable items and objects. The numbers indicate the order in which they should be arranged.",
                //   messages: [
                //     { id: 1, text: "What lock needs", hash: 1, position: { top: 35, left: 45 } },
                //     { id: 2, text: "Good as...", hash: 2, position: { top: 10, left: 60 } },
                //     { id: 3, text: "Silver metallic element", hash: 3, position: { top: 70, left: 25 } },
                //     { id: 4, text: "Yellow fruit", hash: 4, position: { top: 55, left: 80 } }
                //   ],
                //   password: "goldsilverkey"
                // }
            ],
            finalPassword: "INPT"
        },
        game2: {
            title: "Time Traveler Dungeon",
            description: "Unscramble complex historical patterns to unlock the mysterious secret word.",
            energyCost: 0,
            maxAttempts: 12,
            difficulty: "Medium",
            detailedDescription: `
This challenge tests your knowledge of history and your 
ability to decipher hidden chronological patterns. Pay 
close attention to the numerical clues—they hold the key 
to arranging these events in their true historical sequence. 
Solving this puzzle will unlock a forgotten chapter of 
the past, revealing crucial insights for your next mission. 
Only those who can correctly order these events will 
discover the secret that bridges ancient wisdom with modern 
understanding.
`,
            phases: [
                {
                    description: "write the right order of the given number with a minus sign separator (like: 1-2-3-4)",
                    messages: [
                        {
                            id: 1, text: "Invention of writing in Sumer (Mesopotamia)", hash: 24, position:
                                { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 2, text: "Columbus reaches the Americas.", hash: 301, position:
                                { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 3, text: "French Revolution begins", hash: 4, position:
                                { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 4, text: "World War II", hash: 23, position:
                                { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 5, text: "COVID-19 pandemic begins.", hash: 102, position:
                                { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                    ],
                    password: "24-301-4-23-102"
                },
                {
                    description: "Arrange these ancient civilizations in chronological order (oldest first) with a minus sign separator (e.g., 1-2-3-4-5)",
                    messages: [
                        {
                            id: 1,
                            text: "Rise of the Roman Empire",
                            hash: 45,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 2,
                            text: "Construction of the Great Pyramid of Giza",
                            hash: 120,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 3,
                            text: "Fall of the Western Roman Empire",
                            hash: 87,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 4,
                            text: "Birth of Alexander the Great",
                            hash: 56,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 5,
                            text: "Invention of the wheel in Mesopotamia",
                            hash: 210,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                    ],
                    password: "210-120-56-45-87" // Correct order: Wheel → Pyramid → Alexander → Rome → Fall of Rome
                },
                {
                    description: "Order these key events in U.S. history from earliest to latest (e.g., 1-2-3-4-5)",
                    messages: [
                        {
                            id: 1,
                            text: "Declaration of Independence",
                            hash: 1776,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 2,
                            text: "Civil War ends",
                            hash: 1865,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 3,
                            text: "First Moon Landing",
                            hash: 1969,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 4,
                            text: "9/11 Attacks",
                            hash: 2001,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 5,
                            text: "First iPhone released",
                            hash: 2007,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                    ],
                    password: "1776-1865-1969-2001-2007" // Chronological order
                },
                {
                    description: "Sort these scientific breakthroughs by year (earliest first) with a minus separator (e.g., 1-2-3-4-5)",
                    messages: [
                        {
                            id: 1,
                            text: "Newton publishes Principia Mathematica",
                            hash: 1687,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 2,
                            text: "Einstein’s theory of relativity",
                            hash: 1905,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 3,
                            text: "Discovery of DNA structure",
                            hash: 1953,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 4,
                            text: "First cloned mammal (Dolly the sheep)",
                            hash: 1996,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 5,
                            text: "CRISPR gene editing developed",
                            hash: 2012,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                    ],
                    password: "1687-1905-1953-1996-2012" // Correct chronological order
                },
                {
                    description: "Arrange these space milestones in order of occurrence (e.g., 1-2-3-4-5)",
                    messages: [
                        {
                            id: 1,
                            text: "First artificial satellite (Sputnik 1)",
                            hash: 1957,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 2,
                            text: "First human in space (Yuri Gagarin)",
                            hash: 1961,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 3,
                            text: "Apollo 11 Moon landing",
                            hash: 1969,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 4,
                            text: "Hubble Space Telescope launched",
                            hash: 1990,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                        {
                            id: 5,
                            text: "Perseverance rover lands on Mars",
                            hash: 2021,
                            position: { top: ranPosGenerator(100), left: ranPosGenerator(100) }
                        },
                    ],
                    password: "1957-1961-1969-1990-2021" // Correct order
                }
            ],
            finalPassword: "Dead Sea Scrolls"
        }
    };
}