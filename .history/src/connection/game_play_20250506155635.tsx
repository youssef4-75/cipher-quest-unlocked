import { games } from "@/server/database/games_data";

// ------------------------------------------------------------------------------------------------------

export function getGames(gameId: string, user_auth: string){
    // backend logic here for getting the games from the database

    

    if (gameId && (gameId in games)){
        return {
            phase: games[gameId].phases[phase], 
            title: games[gameId].title,
            description: games[gameId].description,
            energyCost: games[gameId].energyCost,
            maxAttempts: games[gameId].maxAttempts,
            difficulty: games[gameId].difficulty,
            detailedDescription: games[gameId].detailedDescription};
    }
    return null;
}


const handleSubmit = (gameId: string, password, user_auth) => {
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

export function generateHint(gameId: string, user_auth: string){

}