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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { HelpCircle, Info, Grab } from "lucide-react";
import { generateHint, getGames, highlightPassword, notifyLoss, submitAnswer } from '@/server/connection/game_play';
import { ViewGame } from "@/types";



// Cost of using a hint
const HINT_COST = 5;

const GamePlay = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { updatePoints, points, addSolvedPassword } = useGame();
  const { toast } = useToast();
  const navigate = useNavigate();


  const [game, setGame] = useState<ViewGame | null>(null);
  const [timer, setTimer] = useState<number>(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [lostReason, setLostReason] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [reward, setReward] = useState("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");
  const [draggedMsg, setDraggedMsg] = useState<number | null>(null);
  const [msgPositions, setMsgPositions] = useState<{ [key: number]: { top: number, left: number } }>();
  const [revealedHint, setRevealedHint] = useState<string | null>(null);
  const [infoDialogOpen, setInfoDialogOpen] = useState(true);
  const [similarityScore, setSimilarityScore] = useState<number | null>(null);
  const [incorrectAttempts, setIncorrectAttempts] = useState<string[]>([]);
  const [isMouseFollowing, setIsMouseFollowing] = useState(false);
  const { user: { id } } = useAuth();

  const containerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {

    // Get game data
    const selectedGame: ViewGame = getGames(gameId, id);


    if (selectedGame !== null) {
      setGame(selectedGame);



      // Initialize message positions from game data
      const initialPositions: { [key: number]: { top: number, left: number } } = {};
      selectedGame.phase.messages.forEach(msg => {
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

  const Surrender = () => {
    notifyLoss(gameId, id);
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

  const handleSubmit = () => {
    // to avoid any attempt of cheating, the server is carged to keep track 
    // of the user attempts and everything related to that, like counting 
    // left attempts, revealing hints, and so on ...
    // Send a password in a game to the 
    // server to verify it, it will return the 
    // similarity level and the highlighted password



    if (!game) return;

    const { state, res } = submitAnswer(id, password, revealedHint);

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
        setGame(getGames(gameId, id));


        setPassword("");
        setRevealedHint(null);
        setSimilarityScore(null);
        setIncorrectAttempts([]);

        // Initialize positions for the next phase
        const nextInitialPositions: { [key: number]: { top: number, left: number } } = {};
        game.phase.messages.forEach(msg => {
          nextInitialPositions[msg.id] = msg.position;
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



  const useHint = () => {
    if (!game) return;
    const hintText = generateHint(gameId, id, revealedHint);

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
  };

  // Add timer effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;


    if (gameStatus === "playing" && !infoDialogOpen) {
      intervalId = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [gameStatus, infoDialogOpen]);

  // Check if the game is over by time limit exceeded
  useEffect(() => {
    if (game && timer >= game.timeLimit) {
      notifyLoss(gameId, id);
      setGameStatus("lost");
      setLostReason("exceeding the time limit");

      toast({
        title: "Game Over",
        description: "You've run out of time.",
        variant: "destructive",
      });
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
              <h3 className="font-medium">{formatTime(game.timeLimit - timer)}</h3>
            </div>
          </div>
          <Progress
            value={((game.timeLimit - timer) / game.timeLimit) * 100}
            className={`h-2 mb-3 ${getProgressColor(game.timeLimit - timer, game.timeLimit)}`}
          />
          <Progress value={(currentPhase / game.length) * 100} className="h-2" />
        </div>

        {gameStatus === "playing" ? (
          <>
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
                {game.phase.description}
              </p>
              {revealedHint && (
                <div className="bg-secondary/50 p-2 rounded-md mb-2 text-sm">
                  <span className="font-medium">Hint:</span> The Password is{revealedHint}
                </div>
              )}
              <div className="text-xs text-muted-foreground">
                Arrange the messages in the correct order and enter the password below.
                Pay attention to the numbers they are everything.
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
                        {highlightPassword(attempt, gameId, id)}
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
                    cursor: isMouseFollowing && draggedMsg === message?.id ? "grabbing" : "grab"
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
                  placeholder="Enter the password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-grow bg-background border-input"
                />
                <Button onClick={e => handleSubmit()}>Submit</Button>
              </div>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={useHint}
                  disabled={points < HINT_COST}
                  className="text-sm"
                >
                  Use Hint ({HINT_COST} Points)
                </Button>
                <Button
                  variant="outline"
                  onClick={Surrender}
                  className="text-sm ml-4"
                >
                  Surrender
                </Button>
              </div>
            </div>
          </>
        ) : gameStatus === "won" ? (
          <div className="text-center p-10 cipher-card">
            <h2 className="text-2xl font-bold mb-4 glow-text">Congratulations!</h2>
            <p className="mb-6">You successfully solved all the puzzles
              and completed <span className="text-green-500 font-bold glow-text">{game.title}</span>.
            </p>
            <p className="mb-6">
              <span className="text-blue-500 font-bold glow-text">{reward}</span>:
              Achieved
            </p>

            <Button onClick={resetGame}>Return to Dashboard</Button>
          </div>
        ) : (
          <div className="text-center p-10 cipher-card">
            <h2 className="text-2xl font-bold mb-4 text-destructive">Game Over</h2>
            <p className="mb-6">You lost by {lostReason}. Better luck next time!</p>
            <Button onClick={resetGame} variant="outline">Return to Dashboard</Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default GamePlay;
