import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth, useGame } from "@/context";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, 
    DialogTitle, DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { HelpCircle, Info, Grab } from "lucide-react";
import { generateHint , getGames,  highlightPassword,
  notifyLoss, submitAnswer } from '@/fetching/game_play';
import { ViewGame } from "@/types";

// Cost of using a hint
const HINT_COST = 5;

const ranPosGenerator = (max: number, min: number) => Math.round(Math.random() * (max - min)) + min;
const randomPos = () => ({ top: ranPosGenerator(70, 0), left: ranPosGenerator(70, 0) });

const GamePlay = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { updatePoints, points, addSolvedPassword } = useGame();
  const { toast } = useToast();
  const navigate = useNavigate();


  const [game, setGame] = useState<ViewGame | null>(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [lostReason, setLostReason] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [reward, setReward] = useState("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  
  const [timer, setTimer] = useState<number>(0);
  
  const [draggedMsg, setDraggedMsg] = useState<number | null>(null);
  const [msgPositions, setMsgPositions] = useState<{ [key: number]: { top: number, left: number } }>({});
  const [isMouseFollowing, setIsMouseFollowing] = useState(false);
  const [animationParams, setAnimationParams] = useState<{ [key: number]: { 
    translateX: number, 
    translateY: number, 
    rotate: number,
    duration: number 
  } }>({});
  
  const [revealedHint, setRevealedHint] = useState<string | null>(null);
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const [incorrectAttempts, setIncorrectAttempts] = useState<string[]>([]);
  const [highlighted, setHighlighted] = useState<JSX.Element>()
  const [hintText, setHintText] = useState<string>("");
  
  const [infoDialogOpen, setInfoDialogOpen] = useState(true);
  
  const [debugging, setDeugging] = useState<string>("")
  
  const { user: { id } } = useAuth();

  const containerRef = useRef<HTMLDivElement>(null);

  const [highlightedAttempts, setHighlightedAttempts] = useState<JSX.Element[]>([]);

  useEffect(() => {
    // Get game data
    const fetchGame = async () => {
      const selectedGame: ViewGame = await getGames(gameId, id);

      if (selectedGame !== null) {
        setGame(selectedGame);

        // Initialize message positions from game data
        const initialPositions: { [key: number]: { top: number, left: number } } = {};
        
        // Make sure we have messages to initialize
        if (selectedGame.phase && selectedGame.phase.messages) {
          selectedGame.phase.messages.forEach(msg => {
            if (msg && msg.id) {
              initialPositions[msg.id] = randomPos();
            }
          });
          
          // Set the states with the initialized values
          setMsgPositions(initialPositions);
        }
      } else {
        toast({
          title: "Game not found",
          description: "The game you're looking for doesn't exist.",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    };

    fetchGame();
  }, [gameId]);

  const Surrender = async () => {
    await notifyLoss(gameId, id);
    setGameStatus("lost");
    setLostReason("Surrendering");
  }
  // Start the game 
  const startGame = () => {
    if (!game) return;

    // end the dialog
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
    if (draggedMsg === null) {
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

  const resetGame = () => {
    navigate("/dashboard");
  };

  const handleSubmit = async () => {
    if (!game) return;

    const { state, res } = await submitAnswer(id, password, revealedHint);
    

    if (["win", "next"].includes(state)) {
      // Password is correct
      setCurrentPhase(prev => prev + 1);
      if (state === 'win') {
        // Game completed
        setGameStatus("won");
        updatePoints(game.difficulty === "Easy" ? 20 : game.difficulty === "Medium" ? 40 : 60);
        const { finalPassword } = res;
        addSolvedPassword(finalPassword);
        setReward(finalPassword);

        toast({
          title: "Game Completed!",
          description: `Congratulations! You've solved all ${game.length} puzzles.`,
        });
      } else {
        // Move to next phase
        toast({
          title: "Correct!",
          description: "Moving to next phase...",
        });

        // Show phase explanation
        toast({
          title: "Phase Explanation",
          description: game.phase.explanation,
          duration: 10000, // 10 seconds
        });

        setTimer(0);
        const updatedGame = await getGames(gameId, id);
        setGame(updatedGame);

        setPassword("");
        setRevealedHint(null);
        setSimilarityScore(null);
        setIncorrectAttempts([]);

        // Initialize positions for the next phase
        const nextInitialPositions: { [key: number]: { top: number, left: number } } = {};
        game.phase.messages.forEach(msg => {
          nextInitialPositions[msg.id] = randomPos();
        });
        setMsgPositions(nextInitialPositions);
      }
    } else {
      // Password is incorrect
      setAttempts(prev => prev + 1);
      const { sim } = res;

      // Calculate similarity score
      setSimilarityScore(sim);

      // Save the incorrect attempt for highlighting
      setIncorrectAttempts(prev => [...prev, password]);

      if (state === "lost") {
        // Game over
        setGameStatus("lost");
        setLostReason("Reaching the max attempts");

        toast({
          title: "Game Over",
          description: "You've run out of attempts.",
          variant: "destructive",
        });
      } else {
        setRevealedHint(res.finalPassword);
        toast({
          title: "Incorrect Password",
          description: `Similarity: ${sim}%. Attempts remaining: ${game.maxAttempts - attempts - 1}`,
          variant: "destructive",
        });
      }
    }

    // Clear input
    setPassword("");
  };


  const useHint = async () => {
    if (!game) return;
    const _htext = await generateHint(gameId, id, revealedHint);
    setHintText(_htext);
  };

  useEffect(() => {
    if (hintText == "") {
      return
    }
    if (hintText === null) {
      toast({
        title: "Not enough points",
        description: `You need ${HINT_COST} points to use a hint. You have ${points} points.`,
        variant: "destructive",
      });
      return;
    }

    setRevealedHint(hintText);

    toast({
      title: "Hint Revealed",
      description: `You've spent ${HINT_COST} points to reveal a hint.`,
    });
  }, [hintText])
  
  // Add timer effect
  useEffect(() => {
    let intervalIdTimer: NodeJS.Timeout;

    if (gameStatus === "playing" && !infoDialogOpen) {
      intervalIdTimer = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalIdTimer) {
        clearInterval(intervalIdTimer);
      } 
    };
  }, [gameStatus, infoDialogOpen]);

  // Check if the game is over by time limit exceeded
  useEffect(() => {
    if (game && game.timed && timer >= game.timeLimit) {
      const handleTimeLimit = async () => {
        await notifyLoss(gameId, id);
        setGameStatus("lost");
        setLostReason("exceeding the time limit");

        toast({
          title: "Game Over",
          description: "You've run out of time.",
          variant: "destructive",
        });
      };
      handleTimeLimit();
    }
  }, [game, timer]);

  // Format timer display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get progress bar color based on remaining time
  const getProgressColor = (remainingTime: number, totalTime: number) => {
    const percentage = (remainingTime / totalTime) * 100;
    if (percentage <= 30) {
      return "bg-red-500";
    }
    return "bg-green-500";
  };

  // Add this new useEffect for random animation parameters
  useEffect(() => {
    if (!game?.phase?.messages) return;

    const updateAnimationParams = () => {
      const newParams: { [key: number]: { 
        translateX: number, 
        translateY: number, 
        rotate: number,
        duration: number 
      } } = {};
      game.phase.messages.forEach(msg => {
        if (msg?.id) {
          newParams[msg.id] = {
            translateX: Math.random() * 40 - 20,
            translateY: Math.random() * 40 - 20,
            rotate: Math.random() * 4 - 2,
            duration: Math.random() * 2 + 1 // Random duration between 1 and 3 seconds
          };
        }
      });
      setAnimationParams(newParams);
    };

    // Initial update
    updateAnimationParams();

    // Update every 2 seconds
    const interval = setInterval(updateAnimationParams, 2000);

    return () => clearInterval(interval);
  }, [game?.phase?.messages]);

  // Add new useEffect to handle only new attempts
  useEffect(() => {
    const processNewAttempt = async () => {
      if (incorrectAttempts.length > 0) {
        // Get only the latest attempt
        const latestAttempt = incorrectAttempts[incorrectAttempts.length - 1];
        
        // Process only the new attempt
        
        const highlightedArray = await highlightPassword(latestAttempt, gameId, id);
        console.log(highlightedArray);
        const newHighlightedElement = (
          <span key={latestAttempt}>
            {highlightedArray && highlightedArray.map((item) => (
              <span key={item.key} style={{ color: (item.color|| 'blue') }}>
                {item.letter}
              </span>
            ))}
          </span>
        );


        // Add the new highlighted attempt to the existing ones
        setHighlightedAttempts(prev => [...prev, newHighlightedElement]);
      }
    };

    processNewAttempt();
  }, [incorrectAttempts.length]); // Only trigger when the number of attempts changes

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
            <DialogDescription className="text-foreground/80">{game.detailedDescription}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-2">

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
                <span className="font-medium">{game.maxAttempts} for all phases</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Phases:</span>
                <span className="font-medium">{game.length}</span>
              </div>
            </div>
          </div>
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
              <h3 className="font-medium">{Math.min(currentPhase + 1, game.length)} of {game.length}</h3>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Attempts</span>
              <h3 className="font-medium">{game.maxAttempts - attempts} remaining</h3>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Time</span>
              <h3 className="font-medium">{game.timed ? formatTime(game.timeLimit - timer) : "∞"}</h3>
            </div>
          </div>
          {game.timed && 
          <Progress
            value={((game.timeLimit - timer) / game.timeLimit) * 100}
            className={`h-2 mb-3 ${getProgressColor(game.timeLimit - timer, game.timeLimit)}`}
          />}
          <Progress value={(currentPhase / game.length) * 100} className="h-2" />
        </div>

        {gameStatus === "playing" ? (
          <>
            <Card className="p-4 mb-6 cipher-card">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Security Layer {currentPhase + 1} Analysis:
                  </p>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      <HelpCircle className="h-4 w-4 mr-1" />
                      Target Info
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div>
                      <h4 className="font-medium mb-1">{game.title}</h4>
                      <p className="text-sm mb-2">{game.description}</p>
                      <div className="text-xs text-muted-foreground">
                        <p>Security Level: {game.difficulty}</p>
                        <p>CPU Load: {game.energyCost}</p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <p className="text-sm mb-3">
                {game.phase.description}
              </p>
              {revealedHint && (
                <div className="bg-secondary/50 p-2 rounded-md mb-2 text-sm">
                  <span className="font-medium">Decrypted Data:</span> {revealedHint}
                </div>
              )}
              <div className="text-xs text-muted-foreground">
                Analyze the encrypted messages and reconstruct the password. The sequence of numbers is crucial for bypassing this security layer.
              </div>

              {/* Similarity Score Display */}
              {similarityScore !== null && (
                <div className="mt-3 p-2 bg-secondary/30 rounded-md">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <span className="text-cipher-300">Decryption Match:</span>
                    <span className="font-mono">{similarityScore}%</span>
                  </p>
                  <div className="w-full bg-card/50 h-1.5 rounded-full mt-1">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                      style={{ width: `${similarityScore}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Last incorrect attempts with highlighting */}
              {incorrectAttempts.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="text-cipher-300">Previous Decryption Attempts:</span>
                    <span className="font-mono">{incorrectAttempts.length}/{game.maxAttempts}</span>
                  </p>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {highlightedAttempts.map((highlightedElement, index) => (
                      <div key={index} className="text-sm p-2 bg-card/30 rounded font-mono">
                        {highlightedElement}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            <div
              ref={containerRef}
              className="relative min-h-[50vh] cipher-card mb-6 p-2 touch-none"
              style={{ touchAction: "none" }}
              onContextMenu={(e) => e.preventDefault()}
              onClick={stopDragging}
            >
              {game.phase.messages.map((message) => (
                <div
                  key={message?.id}
                  className={`draggable-message flex items-center ${draggedMsg === message?.id && isMouseFollowing ? 'pulse ring-2 ring-primary' : ''}`}
                  style={{
                    top: `${msgPositions?.[message?.id]?.top || 0}%`,
                    left: `${msgPositions?.[message?.id]?.left || 0}%`,
                    zIndex: draggedMsg === message?.id ? 10 : 1,
                    cursor: isMouseFollowing && draggedMsg === message?.id ? "grabbing" : "grab",
                    transform: `translate(${animationParams[message?.id]?.translateX || 0}px, ${animationParams[message?.id]?.translateY || 0}px) rotate(${animationParams[message?.id]?.rotate || 0}deg)`,
                    transition: `transform ${animationParams[message?.id]?.duration || 2}s ease-in-out`
                  }}
                  onMouseDown={(e) => handleDragStart(e, message?.id)}
                >
                  <Grab className="h-4 w-4 mr-2 text-muted-foreground" />
                  {message?.text}
                  <div className="flex items-center ml-3 justify-center w-9 h-9 rounded-full bg-purple-500 text-white text-xs font-bold">{message?.hash}</div>
                </div>
              ))}
            </div>



            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <Input
                  placeholder="Enter decryption key"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-grow bg-background border-input"
                />
                <Button onClick={e => handleSubmit()}>Decrypt</Button>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={useHint}
                  disabled={points < HINT_COST}
                  className="text-sm"
                >
                  Decrypt Hint ({HINT_COST} Points)
                </Button>
                <Button
                  variant="outline"
                  onClick={Surrender}
                  className="text-sm ml-4"
                >
                  Abort Mission
                </Button>
              </div>
            </div>
          </>
        ) : gameStatus === "won" ? (
          <Card className="p-6 text-center cipher-card">
            <h2 className="text-2xl font-bold mb-4">System Breached Successfully!</h2>
            <p className="text-muted-foreground mb-4">
              You've successfully bypassed all security layers and gained access to the target system.
            </p>
            <p className="text-sm mb-6">
              Reward: {game.difficulty === "Easy" ? 20 : game.difficulty === "Medium" ? 40 : 60} points
              <br />
              Decrypted Password: {reward}
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              Return to Mission Control
            </Button>
          </Card>
        ) : (
          <Card className="p-6 text-center cipher-card">
            <h2 className="text-2xl font-bold mb-4">Mission Failed</h2>
            <p className="text-muted-foreground mb-4">
              {lostReason === "timeout" 
                ? "The target system detected our presence and changed its security protocols."
                : lostReason === "surrendered"
                ? "Mission aborted by operator."
                : "Maximum decryption attempts reached. The system has locked us out."}
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              Return to Mission Control
            </Button>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default GamePlay;
