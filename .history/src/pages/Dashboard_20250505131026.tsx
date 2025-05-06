
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useGame } from "@/App";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";

// Mock game data
const availableGames = [
  {
    id: "game1",
    title: "The programmer cipher",
    description: "a programer th",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=320&auto=format",
    energyCost: 10,
    maxAttempts: 3,
    phases: 3,
    difficulty: "Easy"
  },
  {
    id: "game2",
    title: "Crypto Conundrum",
    description: "Unscramble complex cryptographic patterns before time runs out.",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=320&auto=format",
    energyCost: 15,
    maxAttempts: 3,
    phases: 4,
    difficulty: "Medium"
  },
  {
    id: "game3",
    title: "The Lost Code",
    description: "Recover the lost encryption key by solving a series of related puzzles.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=320&auto=format",
    energyCost: 20,
    maxAttempts: 2,
    phases: 5,
    difficulty: "Hard"
  },
  {
    id: "game4",
    title: "Binary Secrets",
    description: "Convert binary messages to reveal a mysterious sequence of instructions.",
    image: "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?q=80&w=320&auto=format",
    energyCost: 12,
    maxAttempts: 3,
    phases: 3,
    difficulty: "Medium"
  },
  {
    id: "game5",
    title: "Ancient Cipher",
    description: "Decode messages using forgotten ancient numerical systems.",
    image: "https://images.unsplash.com/photo-1631125915902-d8eda4078a17?q=80&w=320&auto=format",
    energyCost: 25,
    maxAttempts: 2,
    phases: 6,
    difficulty: "Expert"
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
    isDaily: true
  }
];

const Dashboard = () => {
  const { energy, updateEnergy } = useGame();
  const { toast } = useToast();
  const [filter, setFilter] = useState("all");

  const filteredGames = filter === "all" 
    ? availableGames 
    : filter === "daily" 
    ? availableGames.filter(game => game.isDaily) 
    : availableGames.filter(game => game.difficulty.toLowerCase() === filter.toLowerCase());

  const handleGameStart = (gameId: string, energyCost: number) => {
    if (energy < energyCost) {
      toast({
        title: "Not enough energy",
        description: `You need ${energyCost} energy to play this game. Wait for your energy to replenish.`,
        variant: "destructive",
      });
      return;
    }
  };

  return (
    <Layout title="Game Selection">
      <div className="mb-8 flex flex-wrap gap-3">
        <Button 
          onClick={() => setFilter("all")}
          variant={filter === "all" ? "default" : "outline"}>
          All Games
        </Button>
        <Button 
          onClick={() => setFilter("easy")}
          variant={filter === "easy" ? "default" : "outline"}>
          Easy
        </Button>
        <Button 
          onClick={() => setFilter("medium")}
          variant={filter === "medium" ? "default" : "outline"}>
          Medium
        </Button>
        <Button 
          onClick={() => setFilter("hard")}
          variant={filter === "hard" ? "default" : "outline"}>
          Hard
        </Button>
        <Button 
          onClick={() => setFilter("daily")}
          variant={filter === "daily" ? "default" : "outline"}>
          Daily Challenges
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <Card key={game.id} className="cipher-card overflow-hidden flex flex-col animate-fade-in">
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                src={game.image} 
                alt={game.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-sm py-1 px-3 rounded-full text-xs font-medium">
                {game.difficulty}
              </div>
              {game.isDaily && (
                <div className="absolute top-3 left-3 bg-primary/80 backdrop-blur-sm py-1 px-3 rounded-full text-xs font-medium">
                  Daily Challenge
                </div>
              )}
            </div>
            
            <div className="p-5 flex-grow flex flex-col">
              <h3 className="font-bold text-xl mb-2">{game.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">{game.description}</p>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-card rounded-md">
                  <div className="text-xs text-muted-foreground">Energy</div>
                  <div className="font-medium flex items-center justify-center">
                    <Zap className="h-3 w-3 text-yellow-400 mr-1" />
                    {game.energyCost}
                  </div>
                </div>
                <div className="text-center p-2 bg-card rounded-md">
                  <div className="text-xs text-muted-foreground">Attempts</div>
                  <div className="font-medium">{game.maxAttempts}</div>
                </div>
                <div className="text-center p-2 bg-card rounded-md">
                  <div className="text-xs text-muted-foreground">Phases</div>
                  <div className="font-medium">{game.phases}</div>
                </div>
              </div>
              
              <Link to={`/gameplay/${game.id}`} onClick={() => handleGameStart(game.id, game.energyCost)}>
                <Button 
                  className="w-full"
                  disabled={energy < game.energyCost}
                >
                  {energy < game.energyCost ? "Not Enough Energy" : "Play Now"}
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
