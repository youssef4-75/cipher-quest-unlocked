
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
import { HelpCircle, Info } from "lucide-react";

// Mock game data
const games = {
  game1: {
    title: "The Hidden Message",
    description: "Decode a secret communication to reveal a hidden location.",
    energyCost: 10,
    maxAttempts: 3,
    difficulty: "Easy",
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
  const { energy, updateEnergy, updatePoints, points, addSolvedPassword } = useGame();
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

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({x: 0, y: 0});

  useEffect(() => {
    // Get game data
    if (gameId && (gameId in games)) {
      const selectedGame = games[gameId as keyof typeof games];
      setGame(selectedGame);
      
      // Consume energy
      updateEnergy(-selectedGame.energyCost);
      
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

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, msgId: number) => {
    e.preventDefault();
    setDraggedMsg(msgId);
    
    let clientX, clientY;
    
    if ("touches" in e) {
      // Touch event
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    dragStartPos.current = { x: clientX, y: clientY };
    
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("touchend", handleDragEnd);
  };

  const handleDrag = (e: MouseEvent | TouchEvent) => {
    if (draggedMsg === null || !msgPositions || !containerRef.current) return;
    
    let clientX, clientY;
    
    if ("touches" in e) {
      // Touch event
      e.preventDefault();
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      // Mouse event
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const deltaX = clientX - dragStartPos.current.x;
    const deltaY = clientY - dragStartPos.current.y;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const oldPos = msgPositions[draggedMsg];
    
    // Calculate new position as percentage of container
    const newTop = Math.max(0, Math.min(90, oldPos.top + (deltaY / containerRect.height) * 100));
    const newLeft = Math.max(0, Math.min(90, oldPos.left + (deltaX / containerRect.width) * 100));
    
    setMsgPositions(prev => ({
      ...prev,
      [draggedMsg]: { top: newTop, left: newLeft }
    }));
    
    dragStartPos.current = { x: clientX, y: clientY };
  };

  const handleDragEnd = () => {
    setDraggedMsg(null);
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
    document.removeEventListener("touchmove", handleDrag);
    document.removeEventListener("touchend", handleDragEnd);
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
          description: `Attempts remaining: ${game.maxAttempts - attempts - 1}`,
          variant: "destructive",
        });
      }
    }
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
            >
              {game.phases[currentPhase].messages.map((message) => (
                <div 
                  key={message.id}
                  className="draggable-message"
                  style={{
                    top: `${msgPositions?.[message.id]?.top || 0}%`,
                    left: `${msgPositions?.[message.id]?.left || 0}%`,
                    zIndex: draggedMsg === message.id ? 10 : 1,
                    cursor: "move"
                  }}
                  onMouseDown={(e) => handleDragStart(e, message.id)}
                  onTouchStart={(e) => handleDragStart(e, message.id)}
                >
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
