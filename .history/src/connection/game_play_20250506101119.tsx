import { games } from "@/database/games_data";


// Calculate similarity between two strings
const calculateSimilarity = (inputPassword: string, correctPassword: string): number => {
    let similarity = 0;
    const inputLower = inputPassword.toLowerCase();
    const correctLower = correctPassword.toLowerCase();

    // Check each character in input password
    for (let i = 0; i < inputLower.length; i++) {
        const char = inputLower[i];

        // Check if character exists in correct password
        const correctIndex = correctLower.indexOf(char);
        if (correctIndex !== -1) {
            similarity += correctLower.length - Math.abs(correctIndex - i);
        }
    }

    // Normalize score to percentage (0-100)
    const maxPossibleScore = correctLower.length * correctLower.length;
    return Math.round((similarity / maxPossibleScore) * 100);
};

// Highlight correct characters in the password
const highlightPassword = (attempt: string, index: number, correctPassword: string, maxAttempts: number): JSX.Element => {

    //if there are more than 2 attempts left, do nothing
    let corr_color = ''
    let fals_color = ''
    if (index + 2 >= maxAttempts) {
        corr_color = 'green';
        fals_color = 'red';
    }

    const result: JSX.Element[] = [];
    const attemptLower = attempt.toLowerCase();
    const correctLower = correctPassword.toLowerCase();

    for (let i = 0; i < attemptLower.length; i++) {
        const char = attemptLower[i];

        if (i < correctLower.length && char === correctLower[i]) {
            // Character is in correct position
            result.push(<span key={i} className={`text-` + corr_color + `-500 font-bold`}>{attempt[i]}</span>);
        } else {
            // Character is incorrect or in wrong position
            result.push(<span className={`text-` + fals_color + `-500 font-bold`} key={i}>{attempt[i]}</span>);
        }
    }

    return <div className="flex">{result}</div>;
};

// ------------------------------------------------------------------------------------------------------

export function getGames(gameId: number, phase: number){
    // backend logic here for getting the games from the database

    

    if (gameId && (gameId in games)){
        return {
            phase: games[gameId].phases[phase], 
            title: games.,
            description: games.,
            energyCost: games.,
            maxAttempts: games.,
            difficulty: games.,
            detailedDescription: games.};
    }
    return null;
}


const handleSubmit = (game, currentPhase, password, setCurrentPhase, ) => {
    // to avoid any attempt of cheating, the server is carged to keep track 
    // of the user attempts and everything related to that, like counting 
    // left attempts, revealing hints, and so on ...
    // Send a password in a game to the 
    // server to verify it, it will return the 
    // similarity level and the highlighted password

    if (!game) return;

    const currentPhaseData = game.phases[currentPhase];
    const correctPassword = currentPhaseData.password;

    if (password.toLowerCase() === correctPassword.toLowerCase()) {
        // Password is correct
        setCurrentPhase(prev => prev + 1);
        if (currentPhase === game.phases.length - 1) {
            // Game completed

            setGameStatus("won");
            updatePoints(game.difficulty === "Easy" ? 20 : game.difficulty === "Medium" ? 40 : 60);
            addSolvedPassword(game.finalPassword);

            toast({
                title: "Game Completed!",
                description: `Congratulations! You've solved all ${game.phases.length} puzzles.`,
            });
        } else {
            // Move to next phase
            toast({
                title: "Correct!",
                description: "Moving to next phase...",
            });

            setPassword("");
            setRevealedHint(null);
            setSimilarityScore(null);
            setIncorrectAttempts([]);

            // Initialize positions for the next phase
            const nextInitialPositions: { [key: number]: { top: number, left: number } } = {};
            game.phases[currentPhase + 1].messages.forEach(msg => {
                nextInitialPositions[msg.id] = msg.position;
            });
            setMsgPositions(nextInitialPositions);
        }
    } else {
        // Password is incorrect
        setAttempts(prev => prev + 1);

        // Calculate similarity score
        const similarity = calculateSimilarity(password, correctPassword);
        setSimilarityScore(similarity);

        // Save the incorrect attempt for highlighting
        setIncorrectAttempts(prev => [...prev, password]);

        if (attempts + 1 >= game.maxAttempts) {
            // Game over
            setGameStatus("lost");

            toast({
                title: "Game Over",
                description: "You've run out of attempts.",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Incorrect Password",
                description: `Similarity: ${similarity}%. Attempts remaining: ${game.maxAttempts - attempts - 1}`,
                variant: "destructive",
            });
        }
    }

    // Clear input
    setPassword("");
};


function notifyEntry() {
    // used to notify the server that the player is starting to play, 
    // therefore he needs to activate the items he bought

    // included in the getGame method, normally the user in this page wont 
    // need to get more than the game he is playing at the moment
}

