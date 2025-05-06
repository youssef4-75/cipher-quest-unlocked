import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGame } from "@/App";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { HelpCircle, Info, Grab } from "lucide-react";

// Mock game data
const games = {
  game1: {
    title: "The Hidden Message",
    description: "Decode a secret communication to reveal a hidden location.",
    energyCost: 10,
    maxAttempts: 3,
    difficulty: "Easy",
    detailedDescription: "This game challenges your ability to decode and rearrange hidden messages. Pay close attention to the numbers in parentheses, as they indicate the order of words in the final password. Solving this puzzle will lead you to a hidden location that contains valuable information about the next challenge.",
    phases: [
      {
        description: "Find the parts of a secret password that will unlock the next clue. Arrange them in the correct order.",
        messages: [
          { id: 1, text: "First part is 'pass' (2)", position: { top: 15, left: 20 } },
          { id: 2, text: "The code begins with 'cipher' (1)", position: { top: 60, left: 70 } },
          { id: 3, text: "Final segment is 'word' (3)", position: { top: 40, left: 40 } }
        ],
        password: "cipherpassword"
      },
      {
        description: "Colors are important in this stage. Pay attention to the numbers indicating the order.",
        messages: [
          { id: 1, text: "Sky color (3)", position: { top: 25, left: 30 } },
          { id: 2, text: "Roses are... (1)", position: { top: 70, left: 10 } },
          { id: 3, text: "Secret code: 123 (2)", position: { top: 50, left: 65 } }
        ],
        password: "red123blue"
      },
      {
        description: "This puzzle is about valuable items and objects. The numbers indicate the order in which they should be arranged.",
        messages: [
          { id: 1, text: "What lock needs (3)", position: { top: 35, left: 45 } },
          { id: 2, text: "Good as... (1)", position: { top: 10, left: 60 } },
          { id: 3, text: "Silver metallic element (2)", position: { top: 70, left: 25 } },
          { id: 4, text: "Yellow fruit (4)", position: { top: 55, left: 80 } }
        ],
        password: "goldsilverkey"
      }
    ]
  },
  game2: {
    title: "Crypto Conundrum",
    description: "Unscramble complex cryptographic patterns before time runs out.",
    energyCost: 15,
    maxAttempts: 3,
    difficulty: "Medium",
    detailedDescription: "In Crypto Conundrum, you'll face increasingly complex cryptographic puzzles that require both logical thinking and creativity. Each phase presents clues about everyday items arranged in specific combinations. You'll need to identify the objects and arrange them correctly to form the password.",
    phases: [
      {
        description: "This puzzle involves breakfast items. Think about what goes together in the morning.",
        messages: [
          { id: 1, text: "Think about breakfast (2)", position: { top: 30, left: 25 } },
          { id: 2, text: "Cereal needs... (1)", position: { top: 65, left: 40 } },
          { id: 3, text: "White liquid (3)", position: { top: 10, left: 75 } }
        ],
        password: "milkbowl"
      },
      {
        description: "This stage focuses on programming and beverages. Pay attention to the order numbers.",
        messages: [
          { id: 1, text: "Computer language with snakes (2)", position: { top: 45, left: 20 } },
          { id: 2, text: "Coffee alternative (1)", position: { top: 15, left: 55 } },
          { id: 3, text: "Hot beverage herb (3)", position: { top: 70, left: 70 } }
        ],
        password: "teapythonmint"
      }
    ]
  }
};

// Cost of using a hint
const HINT_COST = 5;

const GamePlay = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { updateEnergy, updatePoints, points, addSolvedPassword } = useGame();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [game, setGame] = useState<any>(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [password, setPassword] = useState("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  const [draggedMsg, setDraggedMsg] = useState<number | null>(null);
  const [msgPositions, setMsgPositions] = useState<{[key: number]: {top: number, left: number}}>();
  const [revealedHint, setRevealedHint] = useState<string | null>(null);
  const [infoDialogOpen, setInfoDialogOpen] = useState(true);
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const [incorrectAttempts, setIncorrectAttempts] = useState<string[]>([]);
  const [isMouseFollowing, setIsMouseFollowing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get game data
    if (gameId && (gameId in games)) {
      const selectedGame = games[gameId as keyof typeof games];
      setGame(selectedGame);
      
      // Initialize message positions from game data
      const initialPositions: {[key: number]: {top: number, left: number}} = {};
      selectedGame.phases[0].messages.forEach(msg => {
        initialPositions[msg.id] = msg.position;
      });
      setMsgPositions(initialPositions);
    } else {
      toast({
        title: "Game not found",
        description: "The game you're looking for doesn't exist.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [gameId]);

  // Start the game and consume energy when dialog is closed
  const startGame = () => {
    if (!game) return;
    
    // Consume energy
    updateEnergy(-game.energyCost);
    setInfoDialogOpen(false);
  };

  // Handle mouse move event for following functionality - Enhanced to directly follow mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMouseFollowing || draggedMsg === null || !containerRef.current) return;
      
      // Get mouse position relative to container
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate position as percentage of container
      const newTop = ((e.clientY - containerRect.top) / containerRect.height) * 100;
      const newLeft = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      
      // Update position - Top left of message positioned at mouse cursor
      setMsgPositions(prev => ({
        ...prev,
        [draggedMsg]: { 
          top: Math.max(0, Math.min(90, newTop)), 
          left: Math.max(0, Math.min(90, newLeft)) 
        }
      }));
    };

    // Handle mouse up event to disable following - Listen for right click specifically
    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 2) { // Right mouse button
        setIsMouseFollowing(false);
        setDraggedMsg(null);
      }
    };

    // Add event listeners
    if (isMouseFollowing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('contextmenu', (e) => {
        if (isMouseFollowing) {
          e.preventDefault();
          setIsMouseFollowing(false);
          setDraggedMsg(null);
        }
      });
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMouseFollowing, draggedMsg]);
  
  const stopDragging = (e: React.MouseEvent) => {
    e.preventDefault();
    if (draggedMsg !== null) {
      setDraggedMsg(null);
    }
  }

  const handleDragStart = (e: React.MouseEvent, msgId: number) => {
    e.preventDefault();
    if (draggedMsg === null){
      setDraggedMsg(msgId);
    } else {
      setDraggedMsg(null);
    }
    setIsMouseFollowing(true);
    
    // Get mouse position
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    // Set position directly to mouse position immediately
    if (containerRef.current && msgPositions) {
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate position as percentage of container
      const newTop = ((clientY - containerRect.top) / containerRect.height) * 100;
      const newLeft = ((clientX - containerRect.left) / containerRect.width) * 100;
      
      // Update position - Make top left of message follow mouse cursor exactly
      setMsgPositions(prev => ({
        ...prev,
        [msgId]: { 
          top: Math.max(0, Math.min(90, newTop)), 
          left: Math.max(0, Math.min(90, newLeft)) 
        }
      }));
    }
  };

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
  const highlightPassword = (attempt: string, correctPassword: string): JSX.Element => {
    const result: JSX.Element[] = [];
    const attemptLower = attempt.toLowerCase();
    const correctLower = correctPassword.toLowerCase();
    
    for (let i = 0; i < attemptLower.length; i++) {
      const char = attemptLower[i];
      
      if (i < correctLower.length && char === correctLower[i]) {
        // Character is in correct position
        result.push(<span key={i} className="text-green-500 font-bold">{attempt[i]}</span>);
      } else {
        // Character is incorrect or in wrong position
        result.push(<span className="text-red-500 font-bold" key={i}>{attempt[i]}</span>);
      }
    }
    
    return <div className="flex">{result}</div>;
  };

  const handleSubmit = () => {
    if (!game) return;
    
    const currentPhaseData = game.phases[currentPhase];
    const correctPassword = currentPhaseData.password;
    
    if (password.toLowerCase() === correctPassword.toLowerCase()) {
      // Password is correct
      if (currentPhase === game.phases.length - 1) {
        // Game completed
        setGameStatus("won");
        updatePoints(game.difficulty === "Easy" ? 20 : game.difficulty === "Medium" ? 40 : 60);
        addSolvedPassword(correctPassword);
        
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
        
        setCurrentPhase(prev => prev + 1);
        setPassword("");
        setRevealedHint(null);
        setSimilarityScore(null);
        setIncorrectAttempts([]);
        
        // Initialize positions for the next phase
        const nextInitialPositions: {[key: number]: {top: number, left: number}} = {};
        game.phases[currentPhase + 1].messages.forEach(msg => {
          nextInitialPositions[msg.id] = msg.position;
        });
        setMsgPositions(nextInitialPositions);
      }
    } else {
      // Password is incorrect
      setAttempts(prev => prev + 1);
      
      //if there are more than 2 attempts left, do nothing
      if(prev - game.)

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

  const resetGame = () => {
    navigate("/dashboard");
  };

  const useHint = () => {
    if (!game) return;
    
    if (points < HINT_COST) {
      toast({
        title: "Not enough points",
        description: `You need ${HINT_COST} points to use a hint. You have ${points} points.`,
        variant: "destructive",
      });
      return;
    }
    
    // Generate a hint based on the current password
    const currentPhaseData = game.phases[currentPhase];
    const correctPassword = currentPhaseData.password;
    let hintText = "";
    
    // Simple hint: reveal the first couple characters of the password
    if (correctPassword.length <= 6) {
      hintText = `The password begins with "${correctPassword.substring(0, 1)}..."`;
    } else {
      hintText = `The password begins with "${correctPassword.substring(0, 2)}..."`;
    }
    
    // Deduct points
    updatePoints(-HINT_COST);
    setRevealedHint(hintText);
    
    toast({
      title: "Hint Revealed",
      description: `You've spent ${HINT_COST} points to reveal a hint.`,
    });
  };

  if (!game) {
    return (
      <Layout title="Loading...">
        <div className="flex items-center justify-center min-h-[50vh]">
          <p>Loading game data...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={game.title}>
      <Dialog open={infoDialogOpen} onOpenChange={setInfoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{game.title}</DialogTitle>
            <DialogDescription className="text-foreground/80">
              <div className="space-y-4 mt-2">
                <p>{game.detailedDescription}</p>
                <div className="grid grid-cols-2 gap-2 text-sm mt-4">
                  <div>
                    <span className="text-muted-foreground block">Difficulty:</span>
                    <span className="font-medium">{game.difficulty}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Energy Cost:</span>
                    <span className="font-medium">{game.energyCost}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Max Attempts:</span>
                    <span className="font-medium">{game.maxAttempts} per phase</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block">Phases:</span>
                    <span className="font-medium">{game.phases.length}</span>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-center">
            <Button onClick={startGame}>
              Start Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <div>
              <span className="text-sm text-muted-foreground">Phase</span>
              <h3 className="font-medium">{currentPhase + 1} of {game.phases.length}</h3>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Attempts</span>
              <h3 className="font-medium">{game.maxAttempts - attempts} remaining</h3>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Points</span>
              <h3 className="font-medium">{points}</h3>
            </div>
          </div>
          <Progress value={(currentPhase / game.phases.length) * 100} className="h-2" />
        </div>
        
        {gameStatus === "playing" ? (
          <>
            <div 
              ref={containerRef}
              className="relative min-h-[50vh] cipher-card mb-6 p-2 touch-none"
              style={{ touchAction: "none" }}
              onContextMenu={(e) => e.preventDefault()}
              onClick={stopDragging}
            >
              {game.phases[currentPhase].messages.map((message) => (
                <div 
                  key={message.id}
                  className={`draggable-message flex items-center ${draggedMsg === message.id && isMouseFollowing ? 'pulse ring-2 ring-primary' : ''}`}
                  style={{
                    top: `${msgPositions?.[message.id]?.top || 0}%`,
                    left: `${msgPositions?.[message.id]?.left || 0}%`,
                    zIndex: draggedMsg === message.id ? 10 : 1,
                    cursor: isMouseFollowing && draggedMsg === message.id ? "grabbing" : "grab"
                  }}
                  onMouseDown={(e) => handleDragStart(e, message.id)}
                >
                  <Grab className="h-4 w-4 mr-2 text-muted-foreground" />
                  {message.text}
                </div>
              ))}
            </div>
            
            <Card className="p-4 mb-6 cipher-card">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Phase {currentPhase + 1} Description:
                  </p>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      <HelpCircle className="h-4 w-4 mr-1" />
                      Game Info
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div>
                      <h4 className="font-medium mb-1">{game.title}</h4>
                      <p className="text-sm mb-2">{game.description}</p>
                      <div className="text-xs text-muted-foreground">
                        <p>Difficulty: {game.difficulty}</p>
                        <p>Energy Cost: {game.energyCost}</p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <p className="text-sm mb-3">
                {game.phases[currentPhase].description}
              </p>
              {revealedHint && (
                <div className="bg-secondary/50 p-2 rounded-md mb-2 text-sm">
                  <span className="font-medium">Hint:</span> {revealedHint}
                </div>
              )}
              <div className="text-xs text-muted-foreground">
                Arrange the messages in the correct order and enter the password below.
                Pay attention to the numbers in parentheses - they indicate the order.
              </div>
              
              {/* Similarity Score Display */}
              {similarityScore !== null && (
                <div className="mt-3 p-2 bg-secondary/30 rounded-md">
                  <p className="text-sm font-medium">Similarity Score: {similarityScore}%</p>
                </div>
              )}
              
              {/* Last incorrect attempts with highlighting */}
              {incorrectAttempts.length > 0 && game.maxAttempts - attempts <= 2 && (
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-muted-foreground">Previous attempts:</p>
                  <div className="space-y-1">
                    {incorrectAttempts.map((attempt, index) => (
                      <div key={index} className="text-sm p-1 bg-secondary/20 rounded">
                        {highlightPassword(attempt, game.phases[currentPhase].password)}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Enter the password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-grow bg-background border-input"
                />
                <Button onClick={handleSubmit}>Submit</Button>
              </div>
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={useHint} 
                  disabled={points < HINT_COST || revealedHint !== null}
                  className="text-sm"
                >
                  Use Hint ({HINT_COST} Points)
                </Button>
              </div>
            </div>
          </>
        ) : gameStatus === "won" ? (
          <div className="text-center p-10 cipher-card">
            <h2 className="text-2xl font-bold mb-4 glow-text">Congratulations!</h2>
            <p className="mb-6">You successfully solved all the puzzles and completed the game.</p>
            <Button onClick={resetGame}>Return to Dashboard</Button>
          </div>
        ) : (
          <div className="text-center p-10 cipher-card">
            <h2 className="text-2xl font-bold mb-4 text-destructive">Game Over</h2>
            <p className="mb-6">You've run out of attempts. Better luck next time!</p>
            <Button onClick={resetGame} variant="outline">Return to Dashboard</Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GamePlay;
