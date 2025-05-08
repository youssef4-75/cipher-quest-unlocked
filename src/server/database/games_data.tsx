import { Game } from "../logic/types";

const ranPosGenerator = () => Math.round(Math.random() * 70)
const randomPos = () => ({ top: ranPosGenerator(), left: ranPosGenerator() })


export const games: Record<string, Game> = {
    game1: {
        title: "The Hidden Message of life",
        timeLimit: 240,
        isDaily: false,
        theme: "Biology",
        description: "Decode a hidden pattern in the life of a cell to unlock the secret of life.",
        image: "https://th.bing.com/th/id/OIP.JwHy9evBtiPthoT0ou1lvQHaFj?w=226&h=180&c=7&r=0&o=5&pid=1.7",
        energyCost: 10,
        maxAttempts: 3,
        length: 3,
        difficulty: "Easy",
        detailedDescription: `
This game challenges your knowledge about biology and your ability to decode and rearrange hidden messages. 
Pay close attention to the numbers in parentheses, as they indicate the order
  of words in the final password. Solving this puzzle will lead you to a hidden 
secret representation of the word "life".`,
        phases: [
            {
                description: "Arrange these viral infection stages in correct order(e.g., 1-2 - 3 - 4 - 5)",
                messages: [
                    {
                        id: 1,
                        text: "Viral genome replication",
                        hash: 1,
                        position: randomPos()
                    },
                    {
                        id: 2,
                        text: "Attachment to host cell",
                        hash: 14,
                        position: randomPos()
                    },
                    {
                        id: 3,
                        text: "Assembly of new virions",
                        hash: 3005,
                        position: randomPos()
                    },
                    {
                        id: 4,
                        text: "Entry into host cell",
                        hash: 20,
                        position: randomPos()
                    },
                    {
                        id: 5,
                        text: "Release from host cell",
                        hash: 603,
                        position: randomPos()
                    },
                ],
                password: "14-20-1-3005-603"
            },
            {
                description: "Arrange these steps of protein synthesis in the correct sequence (e.g., 1-2-3-4-5)",
                messages: [
                    {
                        id: 1,
                        text: "tRNA delivers amino acids",
                        hash: 9,
                        position: randomPos()
                    },
                    {
                        id: 2,
                        text: "DNA transcription into mRNA",
                        hash: 10,
                        position: randomPos()
                    },
                    {
                        id: 3,
                        text: "Ribosome reads mRNA",
                        hash: 1002,
                        position: randomPos()
                    },
                    {
                        id: 4,
                        text: "Polypeptide chain folds",
                        hash: 3,
                        position: randomPos()
                    },
                    {
                        id: 5,
                        text: "mRNA exits nucleus",
                        hash: 0,
                        position: randomPos()
                    },
                ],
                password: "10-0-1002-9-3", // Correct order: Transcription → mRNA export → Ribosome → tRNA → Folding
            },
            {
                description: "Arrange these taxonomic ranks from broadest to most specific (e.g., 1-2-3-4-5)",
                messages: [
                    {
                        id: 1,
                        text: "Genus",
                        hash: 2212,
                        position: randomPos()
                    },
                    {
                        id: 2,
                        text: "Kingdom",
                        hash: 2122,
                        position: randomPos()
                    },
                    {
                        id: 3,
                        text: "Species",
                        hash: 1221,
                        position: randomPos()
                    },
                    {
                        id: 4,
                        text: "Phylum",
                        hash: 1222,
                        position: randomPos()
                    },
                    {
                        id: 5,
                        text: "Family",
                        hash: 1112,
                        position: randomPos()
                    },
                ],
                password: "2122-1222-2212-1221-1112", //"1-2-4-5-3", // Correct order: Kingdom → Phylum → Family → Genus → Species
            },
        ],
        finalPassword: "Exire"
    },

    game2: {
        title: "Time Traveler Dungeon",
        timeLimit: 240,
        isDaily: false,
        theme: "History",
        description: "Unscramble complex historical patterns to unlock the mysterious secret word.",
        image: "https://th.bing.com/th/id/OIP.JFvL0P-irptLK96BXZ_cYwHaFt?w=228&h=180&c=7&r=0&o=5&pid=1.7",
        
        energyCost: 15,
        length: 5,
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
                            randomPos()
                    },
                    {
                        id: 2, text: "Columbus reaches the Americas.", hash: 301, position:
                            randomPos()
                    },
                    {
                        id: 3, text: "French Revolution begins", hash: 4, position:
                            randomPos()
                    },
                    {
                        id: 4, text: "World War II", hash: 23, position:
                            randomPos()
                    },
                    {
                        id: 5, text: "COVID-19 pandemic begins.", hash: 102, position:
                            randomPos()
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
                        position: randomPos()
                    },
                    {
                        id: 2,
                        text: "Construction of the Great Pyramid of Giza",
                        hash: 120,
                        position: randomPos()
                    },
                    {
                        id: 3,
                        text: "Fall of the Western Roman Empire",
                        hash: 87,
                        position: randomPos()
                    },
                    {
                        id: 4,
                        text: "Birth of Alexander the Great",
                        hash: 56,
                        position: randomPos()
                    },
                    {
                        id: 5,
                        text: "Invention of the wheel in Mesopotamia",
                        hash: 210,
                        position: randomPos()
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
                        hash: 16,
                        position: randomPos()
                    },
                    {
                        id: 2,
                        text: "Civil War ends",
                        hash: 165,
                        position: randomPos()
                    },
                    {
                        id: 3,
                        text: "First Moon Landing",
                        hash: 19,
                        position: randomPos()
                    },
                    {
                        id: 4,
                        text: "9/11 Attacks",
                        hash: 201,
                        position: randomPos()
                    },
                    {
                        id: 5,
                        text: "First iPhone released",
                        hash: 20,
                        position: randomPos()
                    },
                ],
                password: "16-165-19-201-20" // Chronological order
            },
            {
                description: "Sort these scientific breakthroughs by year (earliest first) with a minus separator (e.g., 1-2-3-4-5)",
                messages: [
                    {
                        id: 1,
                        text: "Newton publishes Principia Mathematica",
                        hash: 93,
                        position: randomPos()
                    },
                    {
                        id: 2,
                        text: "Einstein’s theory of relativity",
                        hash: 11,
                        position: randomPos()
                    },
                    {
                        id: 3,
                        text: "Discovery of DNA structure",
                        hash: 949,
                        position: randomPos()
                    },
                    {
                        id: 4,
                        text: "First cloned mammal (Dolly the sheep)",
                        hash: 1996,
                        position: randomPos()
                    },
                    {
                        id: 5,
                        text: "CRISPR gene editing developed",
                        hash: 0,
                        position: randomPos()
                    },
                ],
                password: "93-11-949-1996-0" // Correct chronological order
            },
            {
                description: "Arrange these space milestones in order of occurrence (e.g., 1-2-3-4-5)",
                messages: [
                    {
                        id: 1,
                        text: "First artificial satellite (Sputnik 1)",
                        hash: 7,
                        position: randomPos()
                    },
                    {
                        id: 2,
                        text: "First human in space (Yuri Gagarin)",
                        hash:70,
                        position: randomPos()
                    },
                    {
                        id: 3,
                        text: "Apollo 11 Moon landing",
                        hash: 77,
                        position: randomPos()
                    },
                    {
                        id: 4,
                        text: "Hubble Space Telescope launched",
                        hash: 17,
                        position: randomPos()
                    },
                    {
                        id: 5,
                        text: "Perseverance rover lands on Mars",
                        hash: 707,
                        position: randomPos()
                    },
                ],
                password: "7-70-77-17-707" // Correct order
            }
        ],
        finalPassword: "Dead Sea Scrolls"
    },

    game3: {
        title: "Biological Complexity Ladder",
        timeLimit: 240,
        isDaily: false,
        theme: "Biology",
        description: "Arrange biological concepts by their organizational hierarchy",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=320&auto=format",
        energyCost: 12,
        length: 5,
        maxAttempts: 10,
        difficulty: "Medium",
        detailedDescription: `Organize biological systems from simplest to most complex organizational level. The correct sequence reveals fundamental patterns in life's architecture.`,
        phases: [
            {
                description: "Order these by biological complexity (simplest first)",
                messages: [
                    { id: 1, text: "Mitochondrion", hash: 842, position: randomPos() },
                    { id: 2, text: "Cardiac muscle cell", hash: 193, position: randomPos() },
                    { id: 3, text: "Human heart", hash: 557, position: randomPos() },
                    { id: 4, text: "Circulatory system", hash: 361, position: randomPos() },
                    { id: 5, text: "Human body", hash: 704, position: randomPos() }
                ],
                password: "842-193-557-361-704" // Organelle → Cell → Organ → System → Organism
            },
            {
                description: "Sequence these by taxonomic hierarchy (most inclusive first)",
                messages: [
                    { id: 1, text: "Homo sapiens", hash: 928, position: randomPos() },
                    { id: 2, text: "Primates", hash: 476, position: randomPos() },
                    { id: 3, text: "Mammalia", hash: 315, position: randomPos() },
                    { id: 4, text: "Chordata", hash: 662, position: randomPos() },
                    { id: 5, text: "Animalia", hash: 129, position: randomPos() }
                ],
                password: "129-662-315-476-928" // Kingdom → Phylum → Class → Order → Species
            },
            {
                description: "Arrange these by number of known species (fewest first)",
                messages: [
                    { id: 1, text: "Tardigrades", hash: 203, position: randomPos() },
                    { id: 2, text: "Cephalopods", hash: 741, position: randomPos() },
                    { id: 3, text: "Birds", hash: 588, position: randomPos() },
                    { id: 4, text: "Flowering plants", hash: 932, position: randomPos() },
                    { id: 5, text: "Bacteria", hash: 107, position: randomPos() }
                ],
                password: "203-741-588-932-107" // ~1,300 → ~800 → ~10,000 → ~300,000 → ~1 trillion
            },
            {
                description: "Order these by genome size (smallest first)",
                messages: [
                    { id: 1, text: "Influenza virus", hash: 654, position: randomPos() },
                    { id: 2, text: "E. coli bacteria", hash: 389, position: randomPos() },
                    { id: 3, text: "Fruit fly", hash: 821, position: randomPos() },
                    { id: 4, text: "Human", hash: 275, position: randomPos() },
                    { id: 5, text: "Japanese flower", hash: 143, position: randomPos() }
                ],
                password: "654-389-821-275-143" // 13kb → 4.6Mb → 140Mb → 3.2Gb → 149Gb
            },
            {
                description: "Sequence these by evolutionary appearance (earliest first)",
                messages: [
                    { id: 1, text: "Photosynthesis", hash: 498, position: randomPos() },
                    { id: 2, text: "Multicellular life", hash: 762, position: randomPos() },
                    { id: 3, text: "Vertebrates", hash: 917, position: randomPos() },
                    { id: 4, text: "Flowers", hash: 354, position: randomPos() },
                    { id: 5, text: "Human language", hash: 601, position: randomPos() }
                ],
                password: "498-762-917-354-601" // ~3.5BYA → ~1BYA → ~500MYA → ~130MYA → ~100KYA
            }
        ],
        finalPassword: "Phylogenetic Tree"
    },

    game4: {
        title: "Digital Evolution Maze",
        timeLimit: 240,
        isDaily: false,
        theme: "Digital",
        description: "Navigate through milestones of computing history and logic puzzles",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=320&auto=format",
        energyCost: 8,
        length: 5,
        maxAttempts: 12,
        difficulty: "Easy",
        detailedDescription: `Decipher the progression of digital technologies through unconventional ordering systems. Each correct arrangement unlocks part of the ultimate encryption key.`,
        phases: [
            {
                description: "Order these by computational power needed (least first)",
                messages: [
                    { id: 1, text: "Sort 100 numbers", hash: 412, position: randomPos() },
                    { id: 2, text: "Break 128-bit encryption", hash: 879, position: randomPos() },
                    { id: 3, text: "Train GPT-3", hash: 253, position: randomPos() },
                    { id: 4, text: "Simulate weather for 1 day", hash: 697, position: randomPos() },
                    { id: 5, text: "Render Toy Story 3", hash: 534, position: randomPos() }
                ],
                password: "412-534-697-253-879" // Simple sort → Rendering → Simulation → ML → Crypto
            },
            {
                description: "Arrange these by network range (smallest first)",
                messages: [
                    { id: 1, text: "Bluetooth", hash: 781, position: randomPos() },
                    { id: 2, text: "Wi-Fi", hash: 346, position: randomPos() },
                    { id: 3, text: "Cellular data", hash: 925, position: randomPos() },
                    { id: 4, text: "Undersea fiber optic", hash: 168, position: randomPos() },
                    { id: 5, text: "Satellite internet", hash: 432, position: randomPos() }
                ],
                password: "781-346-925-168-432" // 10m → 100m → 10km → 1000km → Global
            },
            {
                description: "Sequence these by data size (smallest first)",
                messages: [
                    { id: 1, text: "This text message", hash: 619, position: randomPos() },
                    { id: 2, text: "MP3 song", hash: 284, position: randomPos() },
                    { id: 3, text: "HD movie", hash: 753, position: randomPos() },
                    { id: 4, text: "Human DNA data", hash: 497, position: randomPos() },
                    { id: 5, text: "Internet traffic per second", hash: 862, position: randomPos() }
                ],
                password: "619-284-753-497-862" // KB → MB → GB → TB → PB
            },
            {
                description: "Order these languages by creation year (oldest first)",
                messages: [
                    { id: 1, text: "Python", hash: 391, position: randomPos() },
                    { id: 2, text: "JavaScript", hash: 845, position: randomPos() },
                    { id: 3, text: "COBOL", hash: 627, position: randomPos() },
                    { id: 4, text: "FORTRAN", hash: 159, position: randomPos() },
                    { id: 5, text: "Swift", hash: 732, position: randomPos() }
                ],
                password: "159-627-391-845-732" // 1957 → 1959 → 1991 → 1995 → 2014
            },
            {
                description: "Arrange these by cybersecurity risk (least dangerous first)",
                messages: [
                    { id: 1, text: "Weak password", hash: 548, position: randomPos() },
                    { id: 2, text: "Unpatched software", hash: 913, position: randomPos() },
                    { id: 3, text: "Phishing email", hash: 267, position: randomPos() },
                    { id: 4, text: "Ransomware", hash: 684, position: randomPos() },
                    { id: 5, text: "Supply chain attack", hash: 421, position: randomPos() }
                ],
                password: "548-913-267-684-421" // Individual → Organizational → Widespread → Critical → Systemic
            }
        ],
        finalPassword: "Turing Complete"
    },

    game5: {
        title: "Societal Impact Nexus",
        timeLimit: 240,
        isDaily: true,
        theme: "History",
        description: "Evaluate social phenomena through multiple analytical lenses",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=320&auto=format",
        energyCost: 10,
        length: 5,
        maxAttempts: 9,
        difficulty: "Medium",
        detailedDescription: `Analyze social systems through different ordering criteria that reveal hidden patterns in human behavior and societal structures. Each phase requires a different analytical perspective.`,
        phases: [
            {
                description: "Order these by global adoption rate (slowest first)",
                messages: [
                    { id: 1, text: "Electric cars", hash: 729, position: randomPos() },
                    { id: 2, text: "Mobile phones", hash: 386, position: randomPos() },
                    { id: 3, text: "Radio", hash: 154, position: randomPos() },
                    { id: 4, text: "Internet", hash: 842, position: randomPos() },
                    { id: 5, text: "Social media", hash: 517, position: randomPos() }
                ],
                password: "729-154-386-842-517" // 100yrs → 38yrs → 20yrs → 15yrs → 10yrs
            },
            {
                description: "Arrange these by average years of education required",
                messages: [
                    { id: 1, text: "Fast food worker", hash: 293, position: randomPos() },
                    { id: 2, text: "Electrician", hash: 678, position: randomPos() },
                    { id: 3, text: "Registered nurse", hash: 451, position: randomPos() },
                    { id: 4, text: "Software engineer", hash: 864, position: randomPos() },
                    { id: 5, text: "Neurosurgeon", hash: 137, position: randomPos() }
                ],
                password: "293-678-451-864-137" // 0 → 2 → 4 → 6 → 14+
            },
            {
                description: "Sequence these by global annual deaths (fewest first)",
                messages: [
                    { id: 1, text: "Commercial aviation", hash: 562, position: randomPos() },
                    { id: 2, text: "Shark attacks", hash: 918, position: randomPos() },
                    { id: 3, text: "Lightning strikes", hash: 347, position: randomPos() },
                    { id: 4, text: "Malaria", hash: 725, position: randomPos() },
                    { id: 5, text: "Heart disease", hash: 139, position: randomPos() }
                ],
                password: "918-562-347-725-139" // ~10 → ~500 → ~4,000 → ~400,000 → ~18M
            },
            {
                description: "Order these by years since women gained voting rights (longest first)",
                messages: [
                    { id: 1, text: "New Zealand", hash: 483, position: randomPos() },
                    { id: 2, text: "United States", hash: 796, position: randomPos() },
                    { id: 3, text: "France", hash: 254, position: randomPos() },
                    { id: 4, text: "Switzerland", hash: 631, position: randomPos() },
                    { id: 5, text: "Saudi Arabia", hash: 972, position: randomPos() }
                ],
                password: "483-796-254-631-972" // 1893 → 1920 → 1944 → 1971 → 2015
            },
            {
                description: "Arrange these by carbon footprint (smallest first)",
                messages: [
                    { id: 1, text: "Bicycle 10km", hash: 815, position: randomPos() },
                    { id: 2, text: "Electric car 10km", hash: 429, position: randomPos() },
                    { id: 3, text: "Gas car 10km", hash: 176, position: randomPos() },
                    { id: 4, text: "Domestic flight", hash: 593, position: randomPos() },
                    { id: 5, text: "Transatlantic flight", hash: 348, position: randomPos() }
                ],
                password: "815-429-176-593-348" // 0 → 0.5kg → 2kg → 90kg → 500kg
            }
        ],
        finalPassword: "Social Fabric"
    },

    game6: {
        title: "Ancient Civilizations Challenge",
        timeLimit: 240,
        isDaily: false,
        theme: "History",
        description: "Decipher the rise and fall of ancient empires through cryptic clues.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=320&auto=format",
        energyCost: 10,
        length: 5,
        maxAttempts: 2,
        difficulty: "Expert",
        detailedDescription: `This game is a challenge for the most knowledgeable people, it will test your knowledge about the history of the world, and the history of INPT. and test things you assume are true about this historical diamond. prepare yourself for the challenge.`,
        phases: [
            {
                description: "Order these Mesopotamian developments chronologically (e.g., 1-2-3-4-5)",
                messages: [
                    { id: 1, text: "Invention of cuneiform", hash: 3500, position: randomPos() },
                    { id: 2, text: "Reign of Hammurabi", hash: 1792, position: randomPos() },
                    { id: 3, text: "Construction of Ziggurat of Ur", hash: 2100, position: randomPos() },
                    { id: 4, text: "Fall of Babylon to Persians", hash: 539, position: randomPos() },
                    { id: 5, text: "Development of lunar calendar", hash: 3000, position: randomPos() }
                ],
                password: "3500-3000-2100-1792-539"
            },
            {
                description: "Sequence these Egyptian dynastic periods (oldest first)",
                messages: [
                    { id: 1, text: "Old Kingdom (Pyramid builders)", hash: 2686, position: randomPos() },
                    { id: 2, text: "Middle Kingdom", hash: 2055, position: randomPos() },
                    { id: 3, text: "New Kingdom (Tutankhamun)", hash: 1550, position: randomPos() },
                    { id: 4, text: "Ptolemaic Dynasty (Cleopatra)", hash: 305, position: randomPos() },
                    { id: 5, text: "Roman conquest", hash: 30, position: randomPos() }
                ],
                password: "2686-2055-1550-305-30"
            },
            {
                description: "Arrange these classical philosophers by birth year",
                messages: [
                    { id: 1, text: "Socrates", hash: 470, position: randomPos() },
                    { id: 2, text: "Plato", hash: 428, position: randomPos() },
                    { id: 3, text: "Aristotle", hash: 384, position: randomPos() },
                    { id: 4, text: "Confucius", hash: 551, position: randomPos() },
                    { id: 5, text: "Laozi", hash: 600, position: randomPos() }
                ],
                password: "600-551-470-428-384"
            },
            {
                description: "Order these medieval events chronologically",
                messages: [
                    { id: 1, text: "Fall of Western Roman Empire", hash: 476, position: randomPos() },
                    { id: 2, text: "Charlemagne crowned Emperor", hash: 800, position: randomPos() },
                    { id: 3, text: "First Crusade", hash: 1096, position: randomPos() },
                    { id: 4, text: "Magna Carta signed", hash: 1215, position: randomPos() },
                    { id: 5, text: "Black Death in Europe", hash: 1347, position: randomPos() }
                ],
                password: "476-800-1096-1215-1347"
            },
            {
                description: "Sequence these Renaissance developments",
                messages: [
                    { id: 1, text: "Gutenberg printing press", hash: 1440, position: randomPos() },
                    { id: 2, text: "Da Vinci paints Mona Lisa", hash: 1503, position: randomPos() },
                    { id: 3, text: "Copernicus heliocentric theory", hash: 1543, position: randomPos() },
                    { id: 4, text: "Shakespeare's Hamlet", hash: 1600, position: randomPos() },
                    { id: 5, text: "Galileo's telescope discoveries", hash: 1610, position: randomPos() }
                ],
                password: "1440-1503-1543-1600-1610"
            }
        ],
        finalPassword: "Rosetta Stone"
    },
    
    
    game7: {
        title: "INPT ya jawhara",
        timeLimit: 240,
        isDaily: false,
        theme: "Legendery",
        description: "How much you know about INPT? and how much is what you know true?",
        image: "https://th.bing.com/th/id/OIP.2BqMtksMdCrEhJfazbKfqwAAAA?w=194&h=194&rs=1&pid=ImgDetMain",
        energyCost: 0,
        length: 4,
        maxAttempts: 200,
        difficulty: "Hard",
        detailedDescription: `Unravel the mysteries of antiquity by correctly sequencing pivotal moments from humanity's earliest civilizations. Each correct arrangement reveals part of the ultimate password that unlocks forgotten knowledge.`,
        phases: [
            {
                description: "answer these questions and put them in the order indicated by there numbers to move to next level, no separator, just concatenate the answers",
                messages: [
                    { id: 1, text: "The inexistant classroom in the hall B (write b...).", hash: 1, position: randomPos() },
                    { id: 2, text: "The letter of the hall that no one can enter (just the letter uppercase)", hash: 2, position: randomPos() },
                    { id: 3, text: "the agency resposable for INPT activities", hash: 3, position: randomPos() },
                    { id: 4, text: "INPT is known by Z....", hash: 4, position: randomPos() },
                    { id: 5, text: "An eye arrounded by sports fields", hash: 5, position: randomPos() }
                ],
                password: "b216DANRTZlafa7ayat"
            },
            {
                description: "what among these is the nearest to the INPT building? (with - as a separator)",
                messages: [
                    { id: 1, text: "Campus", hash: 302, position: randomPos() },
                    { id: 2, text: "IAV", hash: 301, position: randomPos() },
                    { id: 3, text: "L9amra", hash: 13, position: randomPos() },
                    { id: 4, text: "ENSIAS", hash: 905, position: randomPos() },
                    { id: 5, text: "Agdal", hash: 343, position: randomPos() }
                ],
                password: "302-301-905-13-343"
            },
            {
                description: "Order these clubs starting from the best one to the least one, commite masjid not included since its not a club, otherwise it will be the best one",
                messages: [
                    { id: 1, text: "CAS", hash: 20, position: randomPos() },
                    { id: 2, text: "GDI", hash: 102, position: randomPos() },
                    { id: 3, text: "A2S", hash: 65, position: randomPos() },
                    { id: 4, text: "MSC", hash: 56, position: randomPos() },
                    { id: 5, text: "ENACTUS", hash: 928, position: randomPos() }
                ],
                password: "20-102-56-928-65"
            },
            {
                description: "A7san Filiere 🙂",
                messages: [
                    {id: 1, text: "ASEDS", hash: 1, position: randomPos()},
                    {id: 2, text: "ICCN", hash: 3021, position: randomPos()},
                    {id: 3, text: "DATA", hash: 2031, position: randomPos()},
                    {id: 4, text: "SMART", hash: 2301, position: randomPos()},
                    {id: 5, text: "CLOUD", hash: 2013, position: randomPos()},
                    {id: 6, text: "SESNum", hash: 2310, position: randomPos()},
                    {id: 7, text: "AMOA", hash: 3201, position: randomPos()}
                ],
                password: "1",
            
            },

        ],
        finalPassword: "INPT"
    },
};
